import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const valideValue = Object.values(data).every(el => el);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      toast.error(
        "password and confirm password must be same"
      )
      return

    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data

      })
      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name : "",
          email : "",
          password : "",
          confirmPassword : ""
        })
        navigate("/login")
      }


    } catch (error) {
      AxiosToastError(error)


    }




  };

  return (
    <section
      className="w-full min-h-screen bg-[#e6f4f1]  flex items-center justify-center px-4"
    >
      {/* SINGLE CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10 relative overflow-hidden m-4">

        {/* Soft background circles (inside same box) */}
        <div className="absolute -top-32 -right-32 w-[300px] h-[300px] rounded-full bg-[#90e0d5] opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-[350px] h-[350px] rounded-full bg-[#7ed9cc] opacity-30"></div>

        {/* CONTENT */}
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-full bg-[#f3fbfa] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300"
            />

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

            {/* Confirm Password */}
            <div className="flex items-center rounded-full bg-[#f3fbfa] px-4 py-2.5 focus-within:ring-2 focus-within:ring-teal-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full bg-transparent text-sm outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            <button
              disabled={!valideValue}
              className={`w-full py-2.5 rounded-full font-semibold text-white transition ${valideValue
                ? "bg-teal-500 hover:bg-teal-600"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Sign up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex-1 h-px bg-gray-200"></div>
              OR
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2.5 text-sm hover:bg-gray-50 transition"
            >
              <FcGoogle size={18} />
              Sign up with Google
            </button>
          </form>

          {/* Footer text */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <span className="text-teal-500 font-medium cursor-pointer">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>

          {/* Welcome text INSIDE SAME CARD */}
          {/* <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-teal-600">
              Welcome!
            </h3>
            <p className="text-sm text-gray-500">
              Create your account and get started
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Register;
