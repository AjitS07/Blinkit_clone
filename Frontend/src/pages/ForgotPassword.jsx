import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: ""

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const valideValue = Object.values(data).every(el => el);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email) {
      toast.error("Email is required");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/verification-otp", {
          state: data
        });
        setData({
          email: ""
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#e6f4f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your registered email
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={data.email}
            onChange={handleChange}
            className="w-full rounded-full bg-[#f3fbfa] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button
            disabled={!valideValue}
            className={`w-full py-2.5 rounded-full font-semibold text-white transition ${valideValue
              ? "bg-teal-500 hover:bg-teal-600"
              : "bg-teal-400 cursor-not-allowed"
              }`}
          >
            Send OTP
          </button>


        </form>

        <p className="text-sm text-center mt-6">
          <Link to="/login" className="text-teal-500">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
