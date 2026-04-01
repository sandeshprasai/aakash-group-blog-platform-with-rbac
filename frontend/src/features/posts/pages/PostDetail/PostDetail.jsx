import { useParams } from "react-router-dom";
import usePostDetail from "../../hooks/usePostDetail";
import Navbar from "../../../../components/layout/Navbar";

const PostDetail = () => {
  const { id } = useParams();
  const { post, loading, error } = usePostDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading post...</p>
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

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <p className="text-gray-500 text-sm mb-6">
          Posted on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {post.body}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;