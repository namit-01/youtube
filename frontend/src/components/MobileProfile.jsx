import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { TiUserAddOutline } from "react-icons/ti";
import { useSelector } from "react-redux";

const MobileProfile = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="md:hidden bg-[#0f0f0f] text-white h-full w-full flex flex-col pt-[100px] p-[10px]">
      {userData && (
        <div className="p-4 flex items-center gap-4 border-b border-gray-800">
          {userData.photoUrl && (
            <img
              src={userData.photoUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{userData.username}</span>
            <span className="text-gray-400 text-sm">{userData.email}</span>
            <p className="text-sm text-blue-400 cursor-pointer hover:underline">
              {userData?.channel ? "view channel" : "create channel"}
            </p>
          </div>
        </div>
      )}
      <div className="flex gap-2 p-4 border-b border-gray-800 overflow-auto">
        <button className="bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2">
          <FcGoogle /> Sign in with Google
        </button>
        <button className="bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2">
          <TiUserAddOutline /> Create new Account
        </button>
        <button className="bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2">
          <MdOutlineSwitchAccount /> Sign in with your account
        </button>
        <button className="bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2">
          <SiYoutubestudio /> Pt Studio
        </button>
        <button className="bg-gray-800 text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2">
          <FiLogOut /> Signout
        </button>
      </div>
    </div>
  );
};

export default MobileProfile;
