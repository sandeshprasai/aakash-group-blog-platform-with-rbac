import { useEffect, useState } from "react";
import { fetchMyPosts } from "../services/postService";

const useMyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMyPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchMyPosts(currentPage);
        setPosts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message || "Error fetching your posts");
      } finally {
        setLoading(false);
      }
    };

    loadMyPosts();
  }, [currentPage]);

  return { posts, loading, error, currentPage, setCurrentPage, totalPages };
};

export default useMyPosts;