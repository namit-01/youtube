import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { TiUserAddOutline } from "react-icons/ti";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { SiYoutubestudio } from "react-icons/si";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase.js";
const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const serverUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      console.log("hiiiii", response);
      let user = response.user;
      let username = user.displayName;
      let email = user.email;
      let photoUrl = user.photoURL;
      const result = await axios.post(
        serverUrl + "/api/auth/google-auth",
        { username, email, photoUrl },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="absolute right-5 top-10 mt-2 w-72 bg-[#212121] text-white rounded-xl shadow-lg z-50">
        {userData && (
          <div className="flex items-center gap-3 p-4 border-b border-gray-700">
            <img
              src={userData?.photoUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-gray-700"
            />
            <div>
              <h4 className="font-semibold">{userData.username}</h4>
              <p className="text-sm text-gray-400">{userData?.email}</p>
              <p
                className="text-sm text-blue-400 cursor-pointer hover:underline"
                onClick={() => {
                  if (userData?.channel) {
                    // Go to channel page
                    navigate("/viewchannel");
                    // navigate(`/channel/${userData.channel._id}`);
                  } else {
                    // Go to create channel flow
                    navigate("/createchannel");
                  }
                }}
              >
                {userData?.channel ? "View Channel" : "Create Channel"}
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col py-2">
          <button
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-xl" />
            Sigin with google
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate("/signup")}
          >
            <TiUserAddOutline className="text-xl" />
            Create New Account
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate("/signin")}
          >
            <MdOutlineSwitchAccount className="text-xl" /> SignIn with other
            account
          </button>
          {userData?.channel && (
            <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700">
              <SiYoutubestudio className="w-5 h-5 text-orange-400" /> PT Studio
            </button>
          )}
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700">
            <FiLogOut className="text-xl" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
