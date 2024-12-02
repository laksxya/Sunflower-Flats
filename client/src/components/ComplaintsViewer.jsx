/* eslint-disable no-multi-str */
import React, { useEffect, useState } from "react";
import axios from "axios";

function ComplaintsViewer(props) {
  const [comps, setComps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getComplaints = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/viewcomplaints");
      setComps(res.data);
    } catch (err) {
      console.log(err);
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
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Complaints Overview
        </h1>
        <p className="text-gray-400 mt-2">
          Current active complaints and their status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {comps.map((ele, index) => {
          return (
            ele.complaints &&
            ele.room_no && (
              <div
                key={index + 1}
                className="group relative overflow-hidden rounded-xl
                  bg-black/30 backdrop-blur-md border border-white/10
                  transition-all duration-300 hover:transform hover:scale-[1.02]
                  hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  {/* Room Number */}
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <svg 
                        className="w-5 h-5 text-blue-400"
                        fill="none" 
                        strokeWidth="2"
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Room Number</p>
                      <p className="text-lg font-semibold text-white">
                        {ele.room_no}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Complaint */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Complaint Details</p>
                    <p className="text-white leading-relaxed">
                      {ele.complaints}
                    </p>
                  </div>

                  {/* Status Indicator - Optional */}
                  <div className="flex items-center justify-end mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full 
                      text-xs font-medium bg-yellow-500/20 text-yellow-400">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>

      {/* Empty State */}
      {comps.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full 
            bg-blue-500/10 mb-4">
            <svg 
              className="w-8 h-8 text-blue-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300">
            No Active Complaints
          </h3>
          <p className="mt-2 text-gray-400">
            All complaints have been resolved.
          </p>
        </div>
      )}
    </div>
  );
}

export default ComplaintsViewer;
