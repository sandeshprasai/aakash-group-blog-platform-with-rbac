import React, { useState } from "react";
import InputField from "../components/InputField";
import useLoginForm from "../hooks/useLoginForm";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { getCurrentUser } from "../services/authService";
import toast from "react-hot-toast";

const Login = () => {
  const { form, errors, handleChange, validate } = useLoginForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const toastId = toast.loading("Logging in...");
      await loginUser({
        username: form.username,
        password: form.password,
        rememberMe: form.rememberMe,
      });

      const data = await getCurrentUser();
      login(data.user);
      toast.success("Login successful!", { id: toastId });
      navigate("/posts");
    } catch (err) {
      console.log("Login error", err);
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-700">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
