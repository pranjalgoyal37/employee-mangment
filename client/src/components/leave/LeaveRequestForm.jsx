// Frontend: React (LeaveRequestForm.jsx)
import React, { useState } from "react";
import axios from "axios";

const LeaveRequestForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("user")).username);
    try {
      const response = await axios.post(
        "http://localhost:5050/api/leave-request",
        {
          start_date: startDate,
          end_date: endDate,
          leave_type: leaveType,
          description,
          user_name: JSON.parse(localStorage.getItem("user")).username,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to submit leave request", error);
    }
  };

  return (
    <div className="max-w-xl  mx-10 mt-10">
      <h2 className="text-2xl font-bold mb-4">Leave Management</h2>
      <div className="flex mb-6">
        <button className="font-semibold border-b-2 border-black mr-6">
          Request Leave
        </button>
        <button className="text-gray-500">Leaves History</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Leave Type</option>
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
          <option value="Emergency">Emergency</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
