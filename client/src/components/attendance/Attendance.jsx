// pages/AttendancePage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FaceAttendance from "./FaceAttendance";
import AttendanceStatusCards from "../components/AttendanceStatusCards";
import AttendanceLog from "../components/AttendanceLog";
import Calendar from "../components/attendance/Calendar";

export default function Attendance() {
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [status, setStatus] = useState("Clocked Out");
  const [hours, setHours] = useState("0.00h");
  const [leave, setLeave] = useState("10 days");
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Replace with your API call
    async function fetchData() {
      try {
        const res = await fetch(
          "http://localhost:5050/api/attendance/user/123"
        );
        const data = await res.json();
        setStatus(data.status);
        setHours(data.workingHours);
        setLeave(data.leaveBalance);
        setLogs(data.logs);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer"
            onClick={() => setShowFaceModal(true)}
          >
            ⏹️ {status === "Clocked Out" ? "Check In" : "Check Out"}
          </button>
          <button className="bg-white border px-4 py-2 rounded cursor-pointer">
            📅 Request Leave
          </button>
        </div>

        {/* Modal */}
        {showFaceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl w-full relative">
              <button
                onClick={() => setShowFaceModal(false)}
                className="absolute top-2 right-3 text-gray-500 text-xl"
              >
                &times;
              </button>
              <FaceAttendance />
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4">Attendance</h1>
        <div className="flex space-x-4 mb-6">
          <button className="border-b-2 border-black pb-1 font-semibold">
            Attendance Log
          </button>
          <button className="text-gray-500 pb-1">Leave Requests</button>
        </div>

        {/* Dynamic Content */}
        <AttendanceStatusCards status={status} hours={hours} leave={leave} />
        <div className="grid grid-cols-3 gap-6">
          <AttendanceLog logs={logs} />
          <Calendar currentDate={date} />
        </div>
      </main>
    </div>
  );
}
