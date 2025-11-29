import React from "react";
import Button from "../components/Button";
function CustomAlert({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-start justify-center pt-[50px] bg-black/50 z-50">
      <div className="bg-[#202124] text-white rounded-lg shadow-lg p-6 w-80">
        <p className="text-sm">{message}</p>
        <div className="flex justify-end mt-10">
          <Button Text="ok" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
