import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        {/* Outer spinner */}
        <div className="w-14 h-14 border-4 border-pink-100 border-t-pink-400 rounded-full animate-spin"></div>

        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-pink-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
