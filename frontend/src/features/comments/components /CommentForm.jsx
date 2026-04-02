import { useState } from "react";
import { createComment } from "../services/commentService";

const CommentForm = ({ postId, onSuccess }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      await createComment({
        post_id: postId,
        comment,
      });

      setComment("");
      onSuccess(); // reload comments
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        className="w-full border rounded-lg p-3 mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className={`px-4 py-2 rounded text-white transition ${
            loading || !comment.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
