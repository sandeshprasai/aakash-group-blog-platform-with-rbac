
import api from "../../../utils/axiosInstance"


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