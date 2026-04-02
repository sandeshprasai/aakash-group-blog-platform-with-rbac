import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URI,
  withCredentials: true,
});

export const fetchComments = async (postId) => {
  try {
    const res = await api.get(`/api/v1/comment/get/${postId}`);
    return res.data;
  } catch (error) {
    if (error.response?.data) throw error.response.data;
    else throw { message: "Failed to fetch comments" };
  }
};

export const createComment = async (data) => {
  try {
    console.log(data);
    const res = await api.post("api/v1/comment/create", data);
    return res.data;
  } catch (error) {
    if (error.response?.data) throw error.response.data;
    else throw { message: "Failed to create comment" };
  }
};
