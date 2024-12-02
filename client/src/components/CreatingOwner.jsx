import React, { useState, useRef } from "react";
import axios from "axios";

function CreatingUser() {
  const nameEl = useRef(null);
  const ageEl = useRef(null);
  const adhaarEl = useRef(null);
  const dobEl = useRef(null);
  const aggreeEl = useRef(null);
  const ownerEl = useRef(null);
  const roomEl = useRef(null);
  const passEl = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [dob, setDob] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [roomno, setRoomno] = useState("");
  const [pass, setPass] = useState("");
  const [aggrementStatus, setAggrementStatus] = useState("");

  const post = async () => {
    try {
      const res = await axios.post("http://localhost:5000/createowner", {
        name: name,
        age: age,
        ownerId: ownerId,
        adhaar: adhaar,
        roomno: roomno,
        password: pass,
        aggrementStatus: aggrementStatus,
        dob: dob,
      });
      if (res.status === 200) {
        nameEl.current.value = "";
        ageEl.current.value = "";
        adhaarEl.current.value = "";
        dobEl.current.value = "";
        ownerEl.current.value = "";
        aggreeEl.current.value = "";
        passEl.current.value = "";
        roomEl.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    post();
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-[650px]">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Create Owner Account
            </h1>
            <p className="mt-2 text-gray-400">
              Fill in the details to register a new owner
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                ref={nameEl}
                value={name}
                onChange={() => setName(nameEl.current.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Owner ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Owner ID
              </label>
              <input
                type="text"
                ref={ownerEl}
                value={ownerId}
                onChange={() => setOwnerId(ownerEl.current.value)}
                placeholder="Enter owner ID"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Room Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Room Number
              </label>
              <input
                type="text"
                ref={roomEl}
                value={roomno}
                onChange={() => setRoomno(roomEl.current.value)}
                placeholder="Enter room number"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Agreement Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Agreement Status
              </label>
              <input
                type="text"
                ref={aggreeEl}
                value={aggrementStatus}
                onChange={() => setAggrementStatus(aggreeEl.current.value)}
                placeholder="Agreement Status (Yes / No)"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                ref={ageEl}
                value={age}
                onChange={() => setAge(ageEl.current.value)}
                placeholder="Enter age"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Adhaar */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Adhaar
              </label>
              <input
                type="text"
                ref={adhaarEl}
                value={adhaar}
                onChange={() => setAdhaar(adhaarEl.current.value)}
                placeholder="Enter Adhaar number"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                ref={passEl}
                value={pass}
                onChange={() => setPass(passEl.current.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                ref={dobEl}
                value={dob}
                onChange={() => setDob(dobEl.current.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transform transition-all duration-300 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatingUser;
