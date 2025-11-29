import React, { useState } from "react";
import { FaArrowLeft, FaUserCircle, FaCloudUploadAlt } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import LogoAuthentication from "../components/LogoAuthentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "../context/AlertContext";
import { useContext } from "react";
export default function SignUp() {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // Avatar preview + name
  const [avatarName, setAvatarName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const navigate = useNavigate();
  const { showMessage } = useContext(AlertContext);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setAvatarName(file.name);
      setAvatarPreview(URL.createObjectURL(file)); // show preview
    }
  };
  const handleNext = () => {
    console.log("ext");
    const API_URL = import.meta.env.VITE_API_URL;

    console.log(API_URL); // http://localhost:5050

    if (step == 1) {
      if (!email || !userName) {
        showMessage("Please fill the required fields");
        return;
      }
    } else if (step == 2) {
      if (!password || !Confirmpassword) {
        showMessage("Please fill the required fields");
        return;
      }
      if (password != Confirmpassword) {
        showMessage("The password did not matched");
        return;
      }
    }
    setStep((s) => (s = s + 1));
  };
  const handleBack = () => {
    if (step > 1) {
      setStep((s) => (s = s - 1));
    } else {
      navigate("/");
    }
  };
  const handleSignUp = async () => {
    setLoading(true);
    if (!backendImage) {
      showMessage("Please upload the image");
    }
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("photoUrl", backendImage);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const result = await axios.post(`${API_URL}/api/auth/signUp`, formData, {
        withCredentials: true,
      });
      setLoading(false);
      console.log("Signup Success:", result.data);

      showMessage(result.data.message);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        showMessage(err.response.data.message); // show backend message
      } else {
        showMessage("something went wrong"); // fallback
      }
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
          <span className="text-white text-2xl font-medium">
            Create Account
          </span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <LogoAuthentication text="Basic Info" />

            <Input
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />

            <div className="flex justify-end mt-10">
              <Button Text="Next" onClick={handleNext} />
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <LogoAuthentication text="Security" />

            <div className="w-full bg-[#3c4043] border border-gray-600 rounded-md px-3 py-3 text-gray-300 flex items-center mt-4">
              <FaUserCircle className="mr-3 opacity-70" size={22} />
              <span>{email}</span>
            </div>

            <div className="relative mt-4">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative mt-4">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={Confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              <label
                htmlFor="showPass"
                className="text-gray-300 cursor-pointer"
              >
                Show Password
              </label>
            </div>

            <div className="flex justify-end mt-8">
              <Button Text="Next" onClick={handleNext} />
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <LogoAuthentication text="Choose Avatar" />

            <div className="flex flex-col items-center mt-6">
              {/* Avatar preview circle */}
              <div className="w-24 h-24 rounded-full bg-[#3c4043] flex items-center justify-center shadow-md border border-gray-600 overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-gray-300" size={70} />
                )}
              </div>

              <p className="text-gray-400 text-sm mt-4">
                You can upload your profile picture
              </p>

              {/* File Upload Styled Input */}
              <div className="w-full mt-6">
                <label
                  htmlFor="avatarUpload"
                  className="w-full bg-transparent border border-gray-500 rounded-md px-3 py-3 text-gray-300 cursor-pointer hover:border-orange-500 transition flex items-center gap-3"
                >
                  <FaCloudUploadAlt className="text-gray-300" size={20} />

                  <span className="truncate">
                    {avatarName ? avatarName : "Choose Avatar"}
                  </span>
                </label>

                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <Button
                Text="Create Account"
                disabled={loading}
                onClick={handleSignUp}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
