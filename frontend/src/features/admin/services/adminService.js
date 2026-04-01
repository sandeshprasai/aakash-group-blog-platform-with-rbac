import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const fetchAllPostsAdmin = async () => {
  try {
    const res = await api.get("/api/v1/admin/posts");
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