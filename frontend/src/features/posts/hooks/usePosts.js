import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchPosts(currentPage);
        setPosts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]); // re-runs every time currentPage changes

  return { posts, loading, error, currentPage, setCurrentPage, totalPages };
};

export default usePosts;