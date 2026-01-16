import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const valideValue = data.every(el => el);

  /* ================= VERIFY OTP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.verify_forgot_password_otp,
        data: {
          otp: data.join(""),
          email: email
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
          state:{
            data : response.data,
            email : email
          }
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: { email }
      });

      if (response.data.success) {
        toast.success("OTP sent successfully");
        setData(["", "", "", "", "", ""]);
        inputRef.current[0].focus();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#e6f4f1] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="text-sm text-gray-500">
            Enter your OTP
          </label>

          {/* OTP BOXES */}
          <div className="flex justify-between gap-2 mt-2">
            {data.map((value, index) => (
              <input
                key={"otp-" + index}
                type="text"
                ref={(ref) => (inputRef.current[index] = ref)}
                value={data[index]}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  const newData = [...data];
                  newData[index] = value;
                  setData(newData);

                  if (value && index < 5) {
                    inputRef.current[index + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !data[index] && index > 0) {
                    inputRef.current[index - 1].focus();
                  }
                }}
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-semibold rounded-xl bg-[#f3fbfa] outline-none focus:ring-2 focus:ring-teal-300"
              />
            ))}
          </div>

          <button
            disabled={!valideValue}
            className={`w-full py-2.5 rounded-full font-semibold text-white transition ${
              valideValue
                ? "bg-teal-500 hover:bg-teal-600"
                : "bg-teal-400 cursor-not-allowed"
            }`}
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Didn’t receive OTP?{" "}
          <button
            onClick={handleResendOtp}
            className="text-teal-500 hover:underline font-medium"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
