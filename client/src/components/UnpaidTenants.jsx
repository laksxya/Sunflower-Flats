import axios from "axios";
import React, { useEffect, useState } from "react";

function UnpaidTenants() {
  const headers = [
    "Tenant No",
    "Name",
    "Age",
    "Room No",
    "Room Type",
    "Block",
    "DOB",
    "Status",
  ];

  const [tenantRows, setTenantRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getUnpaidTenants = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/unpaidtenantdetails");
      const updatedData = res.data.map((tenant) => ({
        ...tenant,
        Age: tenant.Age || calculateAge(tenant.DOB),
      }));
      setTenantRows(updatedData);
    } catch (error) {
      console.error("Error fetching unpaid tenants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnpaidTenants();
  }, []);

  const filteredTenants = tenantRows.filter((tenant) =>
    Object.values(tenant).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
          Unpaid Tenants
        </h1>
        <p className="mt-2 text-gray-400">
          Review the list of tenants with unpaid dues.
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg
              bg-white/5 border border-white/10
              text-white placeholder-gray-500
              focus:border-red-500 focus:ring-2 focus:ring-red-500/20
              transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-500/10 to-purple-500/10">
                    {headers.map((header, index) => (
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
                  {filteredTenants.map((tenant, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant["Tenant no"]}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant.Name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant.Age}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant.Room_no}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant.Room_type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant.Block}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tenant.DOB}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              tenant.Stat === "unpaid"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-green-500/10 text-green-400"
                            }`}
                        >
                          {tenant.Stat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Empty State */}
          {!isLoading && filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-300">
                No unpaid tenants found
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your search terms or clear the filter.
              </p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="mt-4 text-sm text-gray-400 text-center">
          Showing {filteredTenants.length} of {tenantRows.length} tenants
        </div>
      </div>
    </div>
  );
}

export default UnpaidTenants;
