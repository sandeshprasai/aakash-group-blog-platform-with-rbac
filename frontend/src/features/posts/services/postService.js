import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // IMPORTANT (cookies)
});

export const fetchPosts = async () => {
  try {
    const res = await api.get("/api/v1/post/all"); // adjust if endpoint differs
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) throw error.response.data;
    else throw { message: "Failed to fetch posts" };
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