import { useEffect, useState } from "react";
import { fetchAllPostsAdmin } from "../services/adminService";

const useAdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async (page = currentPage) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAllPostsAdmin(page);
      setPosts(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  return {
    posts,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    reload: () => loadPosts(currentPage),
  };
};

export default useAdminPosts;