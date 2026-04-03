import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/services/authService";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">BlogApp</h1>

      <div className="flex items-center gap-6">
        {user && (
          <span className="text-gray-600 text-sm">Hi, {user.username}</span>
        )}

        <Link to="/posts" className="text-gray-700 hover:text-blue-500 transition">
          View All Blogs
        </Link>
        <Link to="/my-posts" className="text-gray-700 hover:text-blue-500 transition">
          My Blogs
        </Link>
        <Link to="/create-post" className="text-gray-700 hover:text-blue-500 transition">
          Create Blog
        </Link>
        {user?.role === "admin" ? (
          <Link to="/admin" className="text-gray-700 hover:text-blue-500 transition">
            Admin Panel
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed" title="Log in as admin to access the page">
            Admin Panel
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;