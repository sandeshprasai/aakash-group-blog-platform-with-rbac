const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No comments yet.</p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {comments.map((c) => (
        <div
          key={c.id}
          className="flex gap-3 bg-white p-4 rounded-lg shadow-sm border"
        >
          {/* Avatar */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
            {c.commenter?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">
                {c.commenter?.username || "Unknown"}
              </p>

              <span className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="text-gray-700 mt-1 leading-relaxed">
              {c.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;