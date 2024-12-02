import axios from "axios";
import React, { useState, useRef } from "react";

function CreatingParkingSlot() {
  const roomEl = useRef(null);
  const slotNoEl = useRef(null);
  const [roomNo, setRoomno] = useState("");
  const [slotNo, setSlotNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createSlot = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/bookslot", {
        roomNo: roomNo,
        slotNo: slotNo,
      });
      if (res.status === 200) {
        roomEl.current.value = "";
        slotNoEl.current.value = "";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    createSlot();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="p-8 pb-0">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Parking Slot Booking
            </h2>
            <p className="mt-2 text-center text-gray-400">
              Reserve your parking space
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="p-8 space-y-6">
            {/* Room Number Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Room Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  ref={roomEl}
                  value={roomNo}
                  onChange={() => setRoomno(roomEl.current.value)}
                  placeholder="Enter your room number"
                  required
                  className="w-full px-4 py-3 rounded-lg
                    bg-white/5 border border-white/10
                    text-white placeholder-gray-500
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Parking Slot Number Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Parking Slot Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  ref={slotNoEl}
                  value={slotNo}
                  onChange={() => setSlotNo(slotNoEl.current.value)}
                  placeholder="Enter parking slot number"
                  required
                  className="w-full px-4 py-3 rounded-lg
                    bg-white/5 border border-white/10
                    text-white placeholder-gray-500
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white font-medium
                transform transition-all duration-300
                hover:from-blue-600 hover:to-purple-600
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg hover:shadow-blue-500/25
                group relative overflow-hidden"
            >
              {/* Button Content */}
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Booking...' : 'Book Slot'}
              </span>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 -ml-16 -mt-16 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl" />
          <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-xl" />
        </div>
      </div>
    </div>
  );
}

export default CreatingParkingSlot;
