import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Particle from "./Particle";

function Auth(props) {
  const nav = useNavigate();
  const inputEl = useRef(null);
  const passEl = useRef(null);
  const [isName, setIsName] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      inputEl.current.value === "" ||
      userId.toUpperCase().charAt(0) === "A" ||
      userId.toUpperCase().charAt(0) === "O" ||
      userId.toUpperCase().charAt(0) === "E" ||
      userId.toUpperCase().charAt(0) === "T"
    ) {
      setIsName(true);
      return;
    } else {
      setIsName(false);
    }
  }, [userId]);

  useEffect(() => {
    if (password.length === 0) {
      setIsPassword(true);
      return;
    } else if (password.length < 6) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, [password]);

  const authorize = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth", {
        username: userId,
        password: password,
      });
      if (res.data.access === "granted") {
        window.localStorage.setItem(
          "whom",
          JSON.stringify({
            userType: res.data.user,
            username: userId,
          })
        );
        if (res.data.user === "employee") {
          nav("/employee", { replace: true });
        }
        if (res.data.user === "admin") {
          nav("/admin", { replace: true });
        }
        if (res.data.user === "tenant") {
          nav("/tenant", { replace: true });
        }
        if (res.data.user === "owner") {
          nav("/owner", { replace: true });
        }
        if (res.data.user === "unknown") {
          setIsName(false);
        } else if (res.data.user === "passunknown") {
          setIsPassword(false);
        }
      } else {
        setIsName(false);
        setIsPassword(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    setUserId(inputEl.current.value);
    setPassword(passEl.current.value);
    authorize();
  };

  return (
    <div className="relative w-full h-screen bg-[#1a1a2e]">
      <div className="absolute inset-0">
        <Particle />
      </div>

      <div className="relative flex items-center justify-center min-h-screen z-10 px-4">
        <div className="w-full max-w-md">
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
                Sunflower Flats
              </h1>
              <p className="text-gray-300 mt-2 text-sm">
                Welcome back! Please sign in.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-6">
              {/* User ID Field */}
              <div className="relative">
                <label
                  htmlFor="user-id"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  User ID
                </label>
                <input
                  ref={inputEl}
                  type="text"
                  autoFocus
                  name="user-id"
                  required
                  value={userId}
                  onChange={() => setUserId(inputEl.current.value)}
                  id="used-id"
                  placeholder="Enter your user ID"
                  className={`w-full px-4 py-3 rounded-lg 
                    ${isName 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-red-500/10 border-red-500/50'
                    } 
                    border backdrop-blur-sm
                    text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    transition-all duration-300`}
                />
                {!isName && (
                  <span className="absolute -bottom-5 right-0 text-xs font-medium text-red-400">
                    Invalid username
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  ref={passEl}
                  type="password"
                  required
                  name="password"
                  id="password"
                  value={password}
                  autoComplete="on"
                  onChange={() => setPassword(passEl.current.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 rounded-lg 
                    ${isPassword 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-red-500/10 border-red-500/50'
                    } 
                    border backdrop-blur-sm
                    text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    transition-all duration-300`}
                />
                {!isPassword && (
                  <span className="absolute -bottom-5 right-0 text-xs font-medium text-red-400">
                    Invalid password
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 text-white font-semibold
                bg-gradient-to-r from-blue-500 to-purple-600
                rounded-lg transition-all duration-300
                hover:from-blue-600 hover:to-purple-700
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-blue-500/25
                disabled:opacity-50 disabled:cursor-not-allowed
                group relative overflow-hidden"
              >
                <span className="relative z-10">Sign in</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
