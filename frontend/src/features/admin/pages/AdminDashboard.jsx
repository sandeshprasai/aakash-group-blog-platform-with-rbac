import Navbar from "../../../components/layout/Navbar";
import useAdminPosts from "../hooks/useAdminPosts";
import AdminPostCard from "../components/AdminPostCard";
import { deleteAnyPost } from "../services/adminService";

const AdminDashboard = () => {
  const { posts, loading, error, reload } = useAdminPosts();

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      await deleteAnyPost(id);
      reload(); // 🔥 no page reload
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading admin panel...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <AdminPostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;