import { useEffect, useState } from "react";
import { fetchAllPostsAdmin } from "../services/adminService";

const useAdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      const data = await fetchAllPostsAdmin();
      setPosts(data.data);
    } catch (err) {
      setError(err.message || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return { posts, loading, error, reload: loadPosts };
};

export default useAdminPosts;