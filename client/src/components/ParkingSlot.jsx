import axios from "axios";
import React, { useState, useEffect } from "react";

function ParkingSlot() {
  const [parkingSlot, setParkingSlot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const slots = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/viewparking", {
        userId: JSON.parse(localStorage.getItem("whom")).username,
      });
      setParkingSlot(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    slots();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Parking Details
        </h1>
        <p className="mt-2 text-gray-400">
          View your allocated parking slots
        </p>
      </div>

      {/* Parking Slots Grid */}
      <div className="max-w-7xl mx-auto">
        {parkingSlot.length === 0 ? (
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Parking Slots</h3>
              <p className="text-gray-400">No parking slots have been allocated yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parkingSlot.map((slot, index) => (
              slot.parking_slot ? (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/10
                    transition-all duration-300 hover:transform hover:scale-[1.02]
                    hover:shadow-lg hover:shadow-blue-500/10"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Parking Slot</h3>
                        <p className="text-2xl font-bold text-white">{slot.parking_slot}</p>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        bg-green-500/10 text-green-400">
                        Active
                      </span>
                      <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>

      {/* Optional Information Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Parking Information
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 security surveillance
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Covered parking available
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Electric vehicle charging stations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ParkingSlot;
