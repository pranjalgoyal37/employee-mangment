import { React, useEffect, useState } from "react";
import axios from "axios";
import LeaveTable from "./LeaveTable";
const LeaveManagment = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLeaves = async () => {
    const res = await axios.get("http://localhost:5050/api/leaves");
    // console.log(res.data);

    setLeaves(res.data);
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-2">
        LEAVE MANAGEMENT
      </h1>
      <p className="text-green-600 mb-6">List of Leaves</p>

      {/* Tabs */}
      <div className="flex space-x-4 border-b-2 border-gray-300 mb-6">
        <button className="pb-2 border-b-4 border-black font-semibold">
          LEAVES HISTORY
        </button>
        <button className="pb-2 text-gray-500 hover:text-black hover:border-black">
          PENDING LEAVES
        </button>
        <button className="pb-2 text-gray-500 hover:text-black hover:border-black">
          Approved Leaves
        </button>
        <button className="pb-2 text-gray-500 hover:text-black hover:border-black">
          Rejected Leaves
        </button>
      </div>

      {/* Search and Add Button */}
      <div className="bg-indigo-200 p-4 flex justify-between items-center rounded mb-6">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded w-full max-w-md focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-indigo-500 text-white text-xl px-4 py-2 rounded-full ml-4 hover:bg-indigo-600 transition">
          +
        </button>
      </div>

      {/* Leave Table */}
      <LeaveTable
        leaves={leaves.filter(
          (leave) =>
            // leave.name.toLowerCase().includes(search.toLowerCase())
            // leave.name
            leave
        )}
      />
    </main>
  );
};

export default LeaveManagment;
