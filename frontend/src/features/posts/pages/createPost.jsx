import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import useCreatePost from "../hooks/useCreatePost";
import { createPost } from "../services/postService";

const CreatePost = () => {
  const { form, errors, handleChange, validate, setForm } = useCreatePost();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);

      await createPost({
        title: form.title,
        body: form.body,
      });

      alert("Post created successfully!");
      setForm({ title: "", body: "" });

      navigate("/posts");
    } catch (err) {
      setServerError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Blog Post
          </h2>

          {serverError && (
            <p className="text-red-500 mb-4 text-center">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Body */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Blog Content
              </label>
              <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-2 border rounded-md ${
                  errors.body ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.body && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.body}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;