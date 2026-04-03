import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URI, // fix — was hardcoded to localhost
  withCredentials: true,
});

export const fetchAllPostsAdmin = async (page = 1, limit = 9) => {
  try {
    const res = await api.get(`/api/v1/admin/posts?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to fetch all posts" };
  }
};

export const deleteAnyPost = async (id) => {
  try {
    const res = await api.delete(`/api/v1/admin/posts/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to delete post" };
  }
};