import React from "react";
import { FaBars, FaMicrophone, FaSearch, FaUserCircle } from "react-icons/fa";
import logo from "../assests/youtube.png";
import { useSelector } from "react-redux";
const Navbar = ({ setSlidebarOpen, setPopUp }) => {
  const { userData, subscribeChannel } = useSelector((state) => state.user);
  return (
    <header className="bg-[#0f0f0f] h-16 p-3 border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="text-xl bg-[#272727]Q p-2 rounded-full md:inline hidden"
            onClick={() => setSlidebarOpen((p) => !p)}
          >
            <FaBars></FaBars>
          </button>
          <div className="flex items-center gap-1">
            <img src={logo} alt="" className="w-[30px]" />
            <span className="text-white font-bold text-xl tracking-tight font-robot hidden sm:inline">
              Youtube
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <div className="flex flex-1">
            <input
              type="text"
              className="flex-1 bg-[#121212] px-4 py-2 rounded-l-full outline-none border border-gray-700"
              placeholder="Search"
            />
            <button className="bg-[#272727] px-4 rounded-r-full border-gray-700 text-white">
              <FaSearch />
            </button>
            <button className="bg-[#272727] p-3 rounded-full text-white">
              <FaMicrophone></FaMicrophone>
            </button>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center gap-3">
          {userData && userData.channel && (
            <button className="hidden md:flex items-center gap-1 bg-[#272727] px-3 py-1 rounded-full cursor-pointer">
              <span className="text-lg">+</span>
              <span>create</span>
            </button>
          )}
          {/* userData && userData.photoUrl ? (<img src={userData.photoUrl} className="w-9 h-9 rounded-full object-cover border-1 border-gray-700 hidden md:flex">):()*/}
          {userData && userData.photoUrl ? (
            <img
              onClick={() => setPopUp((prev) => !prev)}
              src={userData.photoUrl}
              alt="img"
              className="w-9 h-9 rounded-full object-cover border-1 border-gray-700 hidden md:flex"
            />
          ) : (
            <FaUserCircle className="text-3xl hidden md:flex text-gray-400" />
          )}

          <FaSearch className="text-lg md:hidden flex"></FaSearch>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
