import { useEffect, useState } from "react";
import { fetchSinglePost } from "../services/postService";

const usePostDetail = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchSinglePost(id);
        setPost(data.data);
      } catch (err) {
        setError(err.message || "Error fetching post");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  return { post, loading, error };
};

export default usePostDetail;