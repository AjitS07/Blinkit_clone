import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
   

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validValue = Object.values(data).every(el => el);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error(
        "All fields are required"
      )
      return

    }
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        setData({
          email : "",
          password : "",
        })
        
        navigate("/")
      }

    } catch (error) {
       toast.error("Something went wrong");

    }

    // 🔐 API CALL HERE
    console.log("Login data:", data);

    // navigate("/"); // after success
  };

  return (
    <section className="w-full min-h-screen bg-[#e6f4f1]  flex items-center justify-center px-4 ">
      {/* SINGLE CARD */}
      <div className="w-full  max-w-md bg-white rounded-2xl shadow-lg px-8 py-10 relative overflow-hidden m-4">

        {/* Soft background circles */}
        <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-[#90e0d5] opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-[350px] h-[350px] rounded-full bg-[#7ed9cc] opacity-30"></div>

        {/* CONTENT */}
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Log in to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full rounded-full bg-[#f3fbfa] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />

            {/* Password */}
            <div className="flex items-center rounded-full bg-[#f3fbfa] px-4 py-2.5 focus-within:ring-2 focus-within:ring-teal-300">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span
                onClick={() => setShowPassword((p) => !p)}
                className="cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link
                to="/forgot-password"
                className="text-teal-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              disabled={!validValue}
              className={`w-full py-2.5 rounded-full font-semibold text-white transition ${validValue
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-teal-400 cursor-not-allowed"
                }`}
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex-1 h-px bg-gray-200"></div>
              OR
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2.5 text-sm hover:bg-gray-50 transition"
            >
              <FcGoogle size={18} />
              Login with Google
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <span className="text-teal-500 font-medium cursor-pointer">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
