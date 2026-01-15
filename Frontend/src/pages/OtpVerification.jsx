import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const OtpVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [data, setData] = useState(["","","","","",""]);
  const [loading, setLoading] = useState(false);

  const valideValue = data.every(el => el)

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.verify_forgot_password_otp,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message);
        setLoading(false);
        return;
      }

      toast.success("OTP verified successfully");
      navigate("/reset-password");

    } catch (error) {
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: { email }
      });

      if (response.data.success) {
        toast.success(response.data.message)
        setData(["","","","","",""])
      }
    } catch {
      toast.error("Unable to resend OTP");
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
            Verify OTP
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit OTP sent to
            <br />
            <span className="font-medium">{email}</span>
          </p>

          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-4">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter OTP"
              className="w-full text-center tracking-widest text-lg rounded-full bg-[#f3fbfa] px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-300"
            />

            <button
              disabled={valideValue}
              className={`w-full py-2.5 rounded-full font-semibold text-white transition ${
                valideValue
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Didn’t receive OTP?{" "}
            <button
              onClick={handleResendOtp}
              className="text-teal-500 font-medium hover:underline"
            >
              Resend
            </button>
          </div>

          <p className="text-center mt-6 text-sm">
            <Link to="/login" className="text-teal-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OtpVerification;
