import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomDetails() {
  const roomDetailsHeader = [
    "Room no",
    "Room Type",
    "Floor no",
    "Register no",
    "Block no",
    "Parking Slot",
  ];
  const [roomRows, setRoomRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getRoomRows = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/ownerroomdetails", {
        userId: JSON.parse(window.localStorage.getItem("whom")).username,
      });
      setRoomRows(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRoomRows();
  }, []);

  const filteredRooms = roomRows.filter(room =>
    Object.values(room).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Room Details
        </h1>
        <p className="mt-2 text-gray-400">
          View and manage room information
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search rooms..."
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

      {/* Table Container */}
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
                    {roomDetailsHeader.map((header, index) => (
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
                  {filteredRooms.map((room, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {room.room_no}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          bg-blue-500/10 text-blue-400">
                          {room.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {room.floor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {room.reg_no}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {room.block_no}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${room.parking_slot 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-yellow-500/10 text-yellow-400'}`}>
                          {room.parking_slot || 'Not Assigned'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Empty State */}
          {!isLoading && filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-300">No rooms found</h3>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your search terms or clear the filter.
              </p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="mt-4 text-sm text-gray-400 text-center">
          Showing {filteredRooms.length} of {roomRows.length} rooms
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
