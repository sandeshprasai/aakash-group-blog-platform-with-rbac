import Navbar from "../../../components/layout/Navbar";
import useMyPosts from "../hooks/useMyPost";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const { posts, loading, error } = useMyPosts();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        {/* Header with Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Blogs</h2>

          <button
            onClick={() => navigate("/create-post")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Create Blog
          </button>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">
              You haven't created any blogs yet.
            </p>

            <button
              onClick={() => navigate("/create-post")}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;