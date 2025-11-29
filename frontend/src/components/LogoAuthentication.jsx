import React from "react";
import logo from "../assests/youtube.png";
const LogoAuthentication = ({ text }) => {
  return (
    <h1 className="text-3xl font-normal text-white mb-2 flex items-center gap-2">
      <img src={logo} alt="logo" className="w-8 h-8"></img>
      {text}
    </h1>
  );
};

export default LogoAuthentication;
