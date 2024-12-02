import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HamContext } from "../HamContextProvider";
import jasmineImage from "./../assets/jasmine.jpg";

function Header() {
  const nav = useNavigate();
  const { hamActive, hamHandler } = useContext(HamContext);
  const userType = JSON.parse(localStorage.getItem("whom"))?.userType;

  const logoutHandler = () => {
    localStorage.clear();
    nav("/", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-lg border-b border-white/10 animate-gradient-x"></div>

      {/* Content */}
      <div className="relative px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section with hover animation */}
          <Link 
            to={`/${userType}`} 
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 
              transform transition-all duration-300 group-hover:scale-110 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                className="w-full h-full object-cover" 
                src={jasmineImage} 
                alt="Jasmine Icon" 
              />
            </div>
            <div className="transform transition-all duration-300 group-hover:translate-x-2">
              <h1 className="text-xl font-bold text-white">
                Sunflower Flats
              </h1>
              <div className="h-0.5 w-0 bg-white/50 transition-all duration-300 group-hover:w-full" />
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={logoutHandler}
            className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg 
              bg-white/10 text-white font-medium text-sm 
              hover:bg-white/20 transition-all duration-300
              border border-white/10 hover:border-white/25"
          >
            <span>Logout</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>

          {/* Mobile Hamburger Menu with animation */}
          <button
            onClick={hamHandler}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center 
              rounded-lg hover:bg-white/10 transition-colors duration-300"
          >
            <div className="flex flex-col items-center justify-center w-6 h-6">
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 
                ${hamActive ? 'transform rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 
                ${hamActive ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 
                ${hamActive ? 'transform -rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {hamActive && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={hamHandler}
        />
      )}

      {/* Add this to your global CSS or Tailwind config */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
          }
        `}
      </style>
    </nav>
  );
}

export default Header;
