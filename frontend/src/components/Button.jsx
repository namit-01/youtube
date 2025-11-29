import React from "react";
import { ClipLoader } from "react-spinners";

const Button = ({ Text, onClick, disabled = false, loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-2 rounded-full text-white transition flex items-center justify-center gap-2 
        ${
          disabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-950 cursor-pointer"
        }`}
    >
      {loading && <ClipLoader color="#fff" size={18} />}
      {Text}
    </button>
  );
};

export default Button;
