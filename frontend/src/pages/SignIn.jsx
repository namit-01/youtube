import React, { useState, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import LogoAuthentication from "../components/LogoAuthentication";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showMessage } = useContext(AlertContext);
  const goToSignup = () => {
    navigate("/signup");
  };
  const handleBack = () => {
    navigate("/"); // go back to home
  };

  const handleSignIn = async () => {
    // TODO: implement sign-in logic here
    setLoading(true);

    try {
      const api = import.meta.env.VITE_API_URL;
      const result = await axios.post(
        `${api}/api/auth/signIn`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      showMessage(result.data.message);
      navigate("/");
    } catch (err) {
      setLoading(false);
      showMessage(err.response.data.message);
      navigate("/signin");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181818]">
      <div className="bg-[#202124] rounded-2xl p-10 w-full max-w-md shadow-lg">
        <div className="flex items-center mb-6">
          <button
            className="text-gray-300 mr-3 hover:text-white"
            onClick={handleBack}
          >
            <FaArrowLeft size={20} />
          </button>
          <span className="text-white text-2xl font-medium">Sign In</span>
        </div>

        <LogoAuthentication text="Welcome Back" />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mt-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            id="showPass"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <label htmlFor="showPass" className="text-gray-300 cursor-pointer">
            Show Password
          </label>
        </div>
        <div className="flex justify-end mt-3">
          <button
            className="text-sm text-orange-400 hover:text-blue-500"
            onClick={() => {
              navigate("/forgetpassword");
            }}
          >
            Forgot password?
          </button>
        </div>
        <div className="flex justify-end mt-8">
          <Button Text="Sign In" disabled={loading} onClick={handleSignIn} />
        </div>
        <div className="flex justify-end mt-8">
          <Button
            Text="Create Account"
            disabled={loading}
            onClick={goToSignup}
          />
        </div>
      </div>
    </div>
  );
}
