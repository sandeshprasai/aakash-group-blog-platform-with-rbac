const AdminPostCard = ({ post, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-bold mb-2">{post.title}</h3>

      <p className="text-gray-600 line-clamp-3 mb-3">
        {post.body}
      </p>

      <div className="text-xs text-gray-400 mb-3">
        Author ID: {post.user_id}
      </div>

      <button
        onClick={() => onDelete(post.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default AdminPostCard;