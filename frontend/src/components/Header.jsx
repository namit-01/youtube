import React from "react";
import logo from "../assests/youtube.png";
const Header = () => {
  return (
    <header className="flex items-center gap-2 p-4 border-b border-gray-700">
      <img src={logo} alt="PlayTube" className="w-8 h-8" />
      <span className="text-xl font-bold">PlayTube</span>
    </header>
  );
};

export default Header;
