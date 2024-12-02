/* eslint-disable no-multi-str */
import React, { useEffect, useState } from "react";
import axios from "axios";

function ComplaintsViewer(props) {
  const [comps, setComps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getComplaints = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/ownercomplaints", {
        userId: JSON.parse(localStorage.getItem("whom")).username,
      });
      setComps(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Complaints Overview
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2" />
      </div>

      {/* Complaints Container */}
      <div className="space-y-4">
        {comps.map((ele, index) => {
          return (
            ele.complaints &&
            ele.room_no && (
              <div
                key={index + 1}
                className="group relative overflow-hidden rounded-xl
                  bg-black/20 backdrop-blur-md
                  border border-white/10 hover:border-white/20
                  transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-indigo-500/10
                  transform hover:-translate-y-1"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative p-6 flex items-center justify-between">
                  {/* Room Number Section */}
                  <div className="flex items-center space-x-6">
                    {/* Room Icon & Number */}
                    <div className="flex flex-col items-center justify-center 
                      w-16 h-16 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      <span className="text-xs text-indigo-400 font-medium">ROOM</span>
                      <span className="text-xl text-white font-bold">{ele.room_no}</span>
                    </div>

                    {/* Vertical Separator */}
                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                    {/* Complaint Text */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <svg 
                          className="w-4 h-4 text-pink-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-300">Complaint Details</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                        {ele.complaints}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="ml-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400
                      border border-indigo-500/30">
                      Active
                    </span>
                  </div>
                </div>

                {/* Bottom Border Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]
                  bg-gradient-to-r from-transparent via-indigo-500 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          );
        })}
      </div>

      {/* Empty State */}
      {comps.length === 0 && (
        <div className="text-center py-12 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4
            rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
            <svg 
              className="w-8 h-8 text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white">
            No Active Complaints
          </h3>
          <p className="mt-2 text-gray-400">
            Everything is running smoothly
          </p>
        </div>
      )}
    </div>
  );
}

export default ComplaintsViewer;
