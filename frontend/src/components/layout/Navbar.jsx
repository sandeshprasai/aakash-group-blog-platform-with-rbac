import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/services/authService";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">BlogApp</h1>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <span className="text-gray-600 text-sm">
              Hi, {user.username}
            </span>
          )}

          <Link to="/posts" className="hover:text-blue-500">
            View All Blogs
          </Link>

          <Link to="/my-posts" className="hover:text-blue-500">
            My Blogs
          </Link>

          <Link to="/create-post" className="hover:text-blue-500">
            Create Blog
          </Link>

          {user?.role === "admin" ? (
            <Link to="/admin" className="hover:text-blue-500">
              Admin Panel
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">
              Admin Panel
            </span>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          {user && (
            <span className="text-gray-600 text-sm">
              Hi, {user.username}
            </span>
          )}

          <Link to="/posts" onClick={() => setIsOpen(false)}>
            View All Blogs
          </Link>

          <Link to="/my-posts" onClick={() => setIsOpen(false)}>
            My Blogs
          </Link>

          <Link to="/create-post" onClick={() => setIsOpen(false)}>
            Create Blog
          </Link>

          {user?.role === "admin" ? (
            <Link to="/admin" onClick={() => setIsOpen(false)}>
              Admin Panel
            </Link>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">
              Admin Panel
            </span>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;