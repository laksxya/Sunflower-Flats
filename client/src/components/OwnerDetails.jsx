import axios from "axios";
import React, { useEffect, useState } from "react";

function OwnerDetails() {
  const oHeader = [
    "Owner Id",
    "Name",
    "Age",
    "Room no",
    "DOB",
    "Agreement Status",
  ];
  const [ownerRows, setOwnerRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getOwnerData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/ownerdetails");
      setOwnerRows(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOwnerData();
  }, []);

  const filteredOwners = ownerRows.filter(owner =>
    Object.values(owner).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Owner Details
        </h1>
        <p className="mt-2 text-gray-400">
          Comprehensive list of all property owners
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg
              bg-white/5 border border-white/10
              text-white placeholder-gray-500
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
              transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    {oHeader.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOwners.map((owner, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {owner.owner_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {owner.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {owner.age}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {owner.room_no}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {owner.dob}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${owner.aggrement_status === 'yes' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-red-500/10 text-red-400'}`}>
                          {owner.aggrement_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Empty State */}
          {!isLoading && filteredOwners.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-300">No owners found</h3>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your search terms or clear the filter.
              </p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="mt-4 text-sm text-gray-400 text-center">
          Showing {filteredOwners.length} of {ownerRows.length} owners
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;
