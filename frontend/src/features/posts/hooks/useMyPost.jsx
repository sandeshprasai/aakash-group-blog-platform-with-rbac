import { useEffect, useState } from "react";
import { fetchMyPosts } from "../services/postService";

const useMyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyPosts();
        setPosts(data.data || []);
      } catch (err) {
        setError(err.message || "Error loading your posts");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { posts, loading, error };
};

export default useMyPosts;