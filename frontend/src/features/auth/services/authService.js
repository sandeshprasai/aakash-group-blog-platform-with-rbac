import axios from "axios";

// Create an axios instance for backend
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URI, // replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Register function
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/v1/auth/register", userData);
    return response.data;
  } catch (error) {
    // Return error response from backend
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: "Network Error" };
    }
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/api/v1/auth/login", loginData, {
      withCredentials: true, // cookies will be set
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Network Error" };
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post(
      "api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    throw { message: "Loout Failled" };
  }
};
