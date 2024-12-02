import React from "react";
import { Hypnosis } from "react-cssfx-loading/lib";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-900 via-black to-purple-900">
      <div className="relative">
        {/* Loader Animation */}
        <Hypnosis color="rgb(59, 130, 246)" width="50px" height="50px" />

        {/* Text Below Loader */}
        <p className="absolute top-full mt-6 text-center text-lg font-semibold text-white animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
