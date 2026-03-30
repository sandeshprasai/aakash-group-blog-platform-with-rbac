const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2 text-gray-800">
        {post.title}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-4">
        {post.body}
      </p>

      <div className="text-sm text-gray-400">
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default PostCard;