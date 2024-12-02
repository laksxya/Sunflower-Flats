import React, { useState, useRef } from "react";
import axios from "axios";

function CreatingTenant() {
  const tenantEl = useRef(null);
  const nameEl = useRef(null);
  const ageEl = useRef(null);
  const dobEl = useRef(null);
  const roomEl = useRef(null);
  const passEl = useRef(null);

  const adhaarEl = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [roomno, setRoomno] = useState("");
  const [pass, setPass] = useState("");
  const [tenantno, setTenantno] = useState("");
  const [adhaar, setAdhaar] = useState("");

  const createTenant = async () => {
    try {
      const res = await axios.post("http://localhost:5000/createtenant", {
        name: name,
        age: age,
        roomno: roomno,
        tenantno: tenantno,
        password: pass,
        adhaar: adhaar,
        dob: dob,
      });
      if (res.status === 200) {
        tenantEl.current.value = "";
        nameEl.current.value = "";
        ageEl.current.value = "";
        roomEl.current.value = "";
        passEl.current.value = "";
        adhaarEl.current.value = "";
        dobEl.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    createTenant();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[650px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Create Tenant Account
          </h1>
          <p className="mt-2 text-gray-400">
            Fill in the details to register a new tenant
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl">
          <form onSubmit={submitHandler} className="grid gap-6 md:grid-cols-2">
            {/* Personal Information Section */}
            <div className="col-span-2">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
            </div>

            {/* Name Field */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                ref={nameEl}
                value={name}
                onChange={() => setName(nameEl.current.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* Tenant Number Field */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tenant Number
              </label>
              <input
                type="text"
                ref={tenantEl}
                value={tenantno}
                onChange={() => setTenantno(tenantEl.current.value)}
                placeholder="Enter tenant number"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* Room Number Field */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Room Number
              </label>
              <input
                type="text"
                ref={roomEl}
                value={roomno}
                onChange={() => setRoomno(roomEl.current.value)}
                placeholder="Enter room number"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* Age Field */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                ref={ageEl}
                value={age}
                onChange={() => setAge(ageEl.current.value)}
                placeholder="Enter age"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* DOB Field */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                ref={dobEl}
                value={dob}
                onChange={() => setDob(dobEl.current.value)}
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* Adhaar Field */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Adhaar Number
              </label>
              <input
                type="text"
                ref={adhaarEl}
                value={adhaar}
                onChange={() => setAdhaar(adhaarEl.current.value)}
                placeholder="Enter Adhaar number"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  ref={passEl}
                  value={pass}
                  onChange={() => setPass(passEl.current.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg
                    bg-white/5 border border-white/10
                    text-white placeholder-gray-500
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg
                  bg-gradient-to-r from-blue-500 to-purple-500
                  text-white font-medium
                  transform transition-all duration-300
                  hover:from-blue-600 hover:to-purple-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  hover:shadow-lg hover:shadow-blue-500/25
                  group relative overflow-hidden"
              >
                <span className="relative z-10">Create Tenant Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatingTenant;
