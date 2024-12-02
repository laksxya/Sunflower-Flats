import axios from "axios";
import React, { useState, useRef } from "react";

function RaisingComplaints() {
  const blockEl = useRef(null);
  const roomEl = useRef(null);
  const descpEl = useRef(null);
  const tenantEl = useRef(null);

  const [blockno, setBlockno] = useState("");
  const [roomno, setRoomno] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [descp, setDescp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const raiseComplaint = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5000/raisingcomplaint", {
        blockno,
        roomno,
        tenantId,
        descp,
      });
      if (res.status === 200) {
        setShowSuccess(true);
        // Reset form
        setBlockno("");
        setRoomno("");
        setTenantId("");
        setDescp("");
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();
    raiseComplaint();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Submit Complaint
          </h1>
          <p className="mt-2 text-gray-400">
            Please provide details about your complaint
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Grid for Room and Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Room Number
                </label>
                <input
                  ref={roomEl}
                  type="text"
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

              {/* Block Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Block Number
                </label>
                <input
                  ref={blockEl}
                  type="text"
                  value={blockno}
                  onChange={() => setBlockno(blockEl.current.value)}
                  placeholder="Enter block number"
                  className="w-full px-4 py-3 rounded-lg
                    bg-white/5 border border-white/10
                    text-white placeholder-gray-500
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    transition-all duration-300"
                />
              </div>
            </div>

            {/* Tenant ID */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Tenant ID
              </label>
              <input
                ref={tenantEl}
                type="text"
                value={tenantId}
                onChange={() => setTenantId(tenantEl.current.value)}
                placeholder="Enter tenant ID"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Complaint Description
              </label>
              <textarea
                ref={descpEl}
                value={descp}
                onChange={() => setDescp(descpEl.current.value)}
                placeholder="Please describe your complaint in detail..."
                rows="6"
                className="w-full px-4 py-3 rounded-lg
                  bg-white/5 border border-white/10
                  text-white placeholder-gray-500
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-300
                  resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white font-medium
                transform transition-all duration-300
                hover:from-blue-600 hover:to-purple-600
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                disabled:opacity-50 disabled:cursor-not-allowed
                group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Complaint'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
            <svg className="w-6 h-6 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-400">Complaint submitted successfully!</p>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            For urgent complaints, please contact the management office directly
          </p>
        </div>
      </div>
    </div>
  );
}

export default RaisingComplaints;
