import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URI,
  withCredentials: true,
});

export const fetchPosts = async (page = 1, limit = 9) => {
  try {
    const res = await api.get(`/api/v1/post/all?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to fetch posts" };
  }
};

export const fetchMyPosts = async (page = 1, limit = 9) => {
  try {
    const res = await api.get(`/api/v1/post/my-posts?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to fetch your posts" };
  }
};

export const createPost = async (postData) => {
  try {
    const res = await api.post("/api/v1/post/create", postData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to create post" };
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/api/v1/post/my-post/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to delete post" };
  }
};

export const updatePost = async (postData) => {
  try {
    const res = await api.put("/api/v1/post/update-my-post", postData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to update post" };
  }
};

export const fetchSinglePost = async (id) => {
  try {
    const res = await api.get(`/api/v1/post/all/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to fetch post" };
  }
};