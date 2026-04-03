import React, { useState } from "react";
import InputField from "../components/InputField";
import useRegisterForm from "../hooks/useRegisterForm";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { form, errors, handleChange, validate } = useRegisterForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const toastId = toast.loading("Registering...");
      const data = await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
        repeatpassword: form.repeatpassword,
      });

      console.log("Registered Successfully:", data);
      toast.success("Registration successful! You can now log in.", { id: toastId });
      // Optionally redirect to login page
      // navigate("/login");
    } catch (err) {
      console.log("Registration Error:", err);
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="repeatpassword"
            value={form.repeatpassword}
            onChange={handleChange}
            error={errors.repeatpassword}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
