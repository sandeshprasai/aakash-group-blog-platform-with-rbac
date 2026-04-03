import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URI,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

// Routes that should NEVER trigger a refresh attempt
const skipRefreshRoutes = [
  "/refresh-token",
  "/login",
  "/register",
];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const shouldSkip = skipRefreshRoutes.some((route) =>
      originalRequest.url.includes(route)
    );

    // If 401 on a skip route — just reject, no refresh attempt
    if (shouldSkip) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/api/v1/auth/refresh-token");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Don't redirect if user is already on login/register
        if (!window.location.pathname.includes("/login") &&
            !window.location.pathname.includes("/register")) {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;