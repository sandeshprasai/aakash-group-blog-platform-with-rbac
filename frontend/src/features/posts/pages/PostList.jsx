import usePosts from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import Navbar from "../../../components/layout/Navbar";

const PostList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading posts...</p>
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
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h2 className="text-3xl font-bold mb-6 text-center">
        Blog Posts
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default PostList;