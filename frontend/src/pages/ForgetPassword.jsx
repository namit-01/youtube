import React, { useContext, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import Header from "../components/Header";

const ForgetPassword = () => {
  const serverUrl = import.meta.env.VITE_API_URL;
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showMessage } = useContext(AlertContext);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );
      setLoading(false);
      setStep(2);
      showMessage(result.data.message);
    } catch (err) {
      setLoading(false);
      console.log(err);
      showMessage(err.response?.data?.message || err.message);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        { email, otp },
        { withCredentials: true }
      );
      setLoading(false);
      setStep(3);
      showMessage(result.data.message);
    } catch (err) {
      setLoading(false);
      console.log(err);
      showMessage(err.response?.data?.message || err.message);
    }
  };

  // Step 3: Reset Password
  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      return showMessage("Password must be at least 8 characters");
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/resetpassword`,
        { email, password: newPassword },
        { withCredentials: true }
      );
      setLoading(false);
      navigate("/signin");
      showMessage(result.data.message);
    } catch (err) {
      setLoading(false);
      console.log(err);
      showMessage(err.response?.data?.message || err.message);
    }
  };

  // Common button classes with disabled/fade
  const buttonClass =
    "mt-1 w-full py-2 px-4 rounded-md font-medium transition " +
    "bg-orange-600 hover:bg-orange-700 " +
    "disabled:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen flex flex-col bg-[#202124] text-white">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <main className="flex flex-1 items-center justify-center px-4">
        {/* STEP 1: Email */}
        {step === 1 && (
          <div className="w-full max-w-md bg-[#212121] p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Forget Password</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-1 text-gray-300"
                >
                  Enter Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="button"
                  className={buttonClass}
                  disabled={loading}
                  onClick={handleSendOtp}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <div className="w-full max-w-md bg-[#212121] p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Enter OTP</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm mb-1 text-gray-300"
                >
                  Enter One Time Password
                </label>
                <input
                  type="text"
                  id="otp"
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  className={buttonClass}
                  disabled={loading}
                  onClick={handleVerifyOtp}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <div className="w-full max-w-md bg-[#212121] p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm mb-1 text-gray-300"
                >
                  Enter New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={buttonClass}
                  disabled={loading}
                  onClick={handleChangePassword}
                >
                  {loading ? "Updating..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default ForgetPassword;
