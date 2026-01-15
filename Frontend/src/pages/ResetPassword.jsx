import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!data.password || !data.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.reset_Password,
        data: {
          email,
          password: data.password
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Password reset successfully");
      navigate("/login");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#e6f4f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10 relative overflow-hidden">

        {/* Soft background */}
        <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-[#90e0d5] opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-[350px] h-[350px] rounded-full bg-[#7ed9cc] opacity-30"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create a new password for  
            <br />
            <span className="font-medium">{email}</span>
          </p>

          <form onSubmit={handleResetPassword} className="mt-8 space-y-4">
            {/* Password */}
            <div className="flex items-center rounded-full bg-[#f3fbfa] px-4 py-2.5 focus-within:ring-2 focus-within:ring-teal-300">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="New password"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span
                onClick={() => setShowPassword((p) => !p)}
                className="cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-full bg-[#f3fbfa] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />

            <button
              disabled={loading}
              className={`w-full py-2.5 rounded-full font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Remember your password?{" "}
            <Link to="/login" className="text-teal-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
