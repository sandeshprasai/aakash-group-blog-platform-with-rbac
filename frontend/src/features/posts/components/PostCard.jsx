import { useNavigate } from "react-router-dom";

const PostCard = ({ post, onDelete, onEdit, isOwner }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>

      <p className="text-gray-600 mb-4 line-clamp-4">
        {post.body}
      </p>

      <div className="text-sm text-gray-400 mb-4">
        {new Date(post.createdAt).toLocaleDateString()}
      </div>

      {isOwner && (
        <div
          className="flex gap-3"
          onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
        >
          <button
            onClick={() => onEdit(post)}
            className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(post.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;