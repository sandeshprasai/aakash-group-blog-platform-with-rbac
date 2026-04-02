import { useEffect, useState } from "react";
import { fetchComments } from "../services/commentService";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    try {
      const data = await fetchComments(postId);
      setComments(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return { comments, loading, reload: loadComments };
};

export default useComments;