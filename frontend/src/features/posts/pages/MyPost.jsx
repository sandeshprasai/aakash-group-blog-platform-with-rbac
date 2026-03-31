import Navbar from "../../../components/layout/Navbar";
import useMyPosts from "../hooks/useMyPost";
import PostCard from "../components/PostCard";
import { deletePost, updatePost } from "../services/postService";
import { useState } from "react";

const MyPosts = () => {
  const { posts, loading, error } = useMyPosts();

  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(id);
      window.location.reload(); // simple refresh (can optimize later)
    } catch (err) {
      alert(err.message);
    }
  };

  // OPEN EDIT
  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      body: post.body,
    });
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await updatePost({
        post_id: editingPost.id,
        title: form.title,
        body: form.body,
      });

      alert("Post updated successfully");
      setEditingPost(null);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Blogs</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                isOwner={true}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setEditingPost(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold mb-5 text-gray-800">
              Edit Blog
            </h3>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Body */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Content
              </label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={
                  form.title === editingPost.title &&
                  form.body === editingPost.body
                }
                className={`px-5 py-2 rounded-lg text-white transition ${
                  form.title === editingPost.title &&
                  form.body === editingPost.body
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
