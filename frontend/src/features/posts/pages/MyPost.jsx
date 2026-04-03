import Navbar from "../../../components/layout/Navbar";
import useMyPosts from "../hooks/useMyPost";
import PostCard from "../components/PostCard";
import { deletePost, updatePost } from "../services/postService";
import { useState } from "react";
import toast from "react-hot-toast";

const MyPosts = () => {
  const {
    posts,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useMyPosts();

  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });

  // DELETE
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-gray-800 font-medium">Are you sure you want to delete this post?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const toastId = toast.loading("Deleting post...");
                  await deletePost(id);
                  toast.success("Post deleted successfully!", { id: toastId });
                  if (posts.length === 1 && currentPage > 1) {
                    setCurrentPage((p) => p - 1);
                  } else {
                    setCurrentPage((p) => p);
                  }
                } catch (err) {
                  toast.error(err.message);
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // OPEN EDIT MODAL
  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({ title: post.title, body: post.body });
  };

  // UPDATE
  const handleUpdate = async () => {
    const toastId = toast.loading("Updating post...");
    try {
      await updatePost({
        post_id: editingPost.id,
        title: form.title,
        body: form.body,
      });
      toast.success("Post updated successfully", { id: toastId });
      setEditingPost(null);
      setCurrentPage((p) => p); // trigger re-fetch
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Loading your posts...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Blogs</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            You haven't written any posts yet.
          </p>
        ) : (
          <>
            {/* POSTS GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isOwner={true}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
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

      {/* EDIT MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setEditingPost(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-5 text-gray-800">Edit Blog</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={form.title === editingPost.title && form.body === editingPost.body}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  form.title === editingPost.title && form.body === editingPost.body
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;