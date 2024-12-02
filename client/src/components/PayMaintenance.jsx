import axios from "axios";
import React, { useState, useEffect } from "react";

function PayMaintenance() {
  const [isPaid, setIsPaid] = useState(false);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const pay = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`http://localhost:5000/dashboard/tenant`, {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      const [result] = res.data;
      setRows(result);
      setIsPaid(result.stat === "paid");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pay();
  }, []);

  useEffect(() => {
    if (isPaid) {
      axios.post("http://localhost:5000/paymaintanance", {
        userId: JSON.parse(localStorage.getItem("whom")).username,
        status: "Paid",
      });
    }
  }, [isPaid]);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsPaid(true);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Maintenance Payment
        </h1>
        <p className="mt-2 text-gray-400">
          Manage your maintenance payments and view status
        </p>
      </div>

      {/* Payment Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="p-6">
              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Tenant Name</p>
                    <p className="text-lg font-semibold text-white">{rows.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Room Number</p>
                    <p className="text-lg font-semibold text-white">{rows.room_no}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Tenant ID</p>
                    <p className="text-lg font-semibold text-white">{rows.tenant_id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Payment Status</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${isPaid 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                        {isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Amount Section */}
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Maintenance Fee</p>
                    <p className="text-2xl font-bold text-white">USD 500.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Due Date</p>
                    <p className="text-lg font-semibold text-white">Dec 1, 2024</p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              {!isPaid && (
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
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
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </>
                    ) : (
                      'Pay Maintenance Fee'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              )}

              {/* Payment Success Message */}
              {isPaid && (
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-400 font-medium">Payment Successful!</p>
                  <p className="text-gray-400 text-sm mt-1">Thank you for your payment</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-sm text-gray-400 text-center">
          For any payment-related queries, please contact the management office
        </div>
      </div>
    </div>
  );
}

export default PayMaintenance;
