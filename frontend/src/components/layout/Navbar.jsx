import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/services/authService";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-blue-600">BlogApp</h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/posts"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          View All Blogs
        </Link>
        <Link
          to="/posts"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          View My Blogs
        </Link>

        <Link
          to="/create-post"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Create Blog
        </Link>

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
