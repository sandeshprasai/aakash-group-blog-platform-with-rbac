import Navbar from "../../../components/layout/Navbar";
import useAdminPosts from "../hooks/useAdminPosts";
import AdminPostCard from "../components/AdminPostCard";
import { deleteAnyPost } from "../services/adminService";

const AdminDashboard = () => {
  const {
    posts,
    loading,
    error,
    reload,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useAdminPosts();

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteAnyPost(id);
      // If deleting last post on page, go back one
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        reload();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading admin panel...</p>
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
        <h2 className="text-3xl font-bold text-center mb-2">Admin Dashboard</h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Manage all posts across the platform
        </p>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No posts found.</p>
        ) : (
          <>
            {/* POSTS GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <AdminPostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-2 rounded-lg bg-white shadow text-sm font-medium
                             disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  ← Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition
                        ${currentPage === page
                          ? "bg-blue-600 text-white shadow"
                          : "bg-white text-gray-600 hover:bg-gray-50 shadow"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 rounded-lg bg-white shadow text-sm font-medium
                             disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;