import React, { useState, useRef } from "react";
import axios from "axios";

function DeletingOwner() {
  const ownerEl = useRef(null);
  const [ownerId, setOwnerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteOwner = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/deleteidentity", {
        ownerId: ownerId,
      });
      if (res.status === 200) {
        ownerEl.current.value = "";
        setOwnerId("");
        // Custom success notification
        showNotification("Tenant deleted successfully", "success");
      }
    } catch (error) {
      console.log(error);
      showNotification("Failed to delete tenant", "error");
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const showNotification = (message, type) => {
    // You can implement a toast notification here
    alert(message);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
            Delete Tenant
          </h1>
          <p className="mt-2 text-gray-400">
            Please enter the tenant ID to remove from the system
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-xl">
          <form onSubmit={submitHandler}>
            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tenant ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  ref={ownerEl}
                  value={ownerId}
                  onChange={() => setOwnerId(ownerEl.current.value)}
                  placeholder="Enter tenant ID"
                  className="w-full px-4 py-3 rounded-lg
                    bg-white/5 border border-white/10
                    text-white placeholder-gray-500
                    focus:border-red-500 focus:ring-2 focus:ring-red-500/20
                    transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!ownerId || isLoading}
              className="w-full px-6 py-3 rounded-lg
                bg-gradient-to-r from-red-500 to-purple-500
                text-white font-medium
                transform transition-all duration-300
                hover:from-red-600 hover:to-purple-600
                focus:outline-none focus:ring-2 focus:ring-red-500/50
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg hover:shadow-red-500/25
                group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Deleting...' : 'Delete Tenant'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
        </div>

        {/* Warning Message */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            ⚠️ This action cannot be undone. Please verify the tenant ID before proceeding.
          </p>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black/80 border border-white/10 rounded-2xl p-8 max-w-md mx-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete tenant with ID: <span className="font-semibold text-red-400">{ownerId}</span>?
                This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-white
                    hover:bg-white/5 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteOwner}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white
                    hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletingOwner;
