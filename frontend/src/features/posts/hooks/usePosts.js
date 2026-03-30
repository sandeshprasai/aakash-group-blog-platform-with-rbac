import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postService";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.data || []);
      } catch (err) {
        setError(err.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
};

export default usePosts;