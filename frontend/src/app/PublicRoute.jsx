import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (isAuthenticated) {
    return <Navigate to="/posts" replace />;
  }

  return children;
};

export default PublicRoute;