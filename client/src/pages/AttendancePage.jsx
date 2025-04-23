import React, { useState } from "react";
import FaceAttendance from "../components/attendance/FaceAttendance";
import AttendanceTable from "../components/attendance/AttendanceTable";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UserAttendance from "../components/attendance/userAttendance";
import axios from "axios";
const AttendancePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showFaceModal, setShowFaceModal] = useState(false);
  const [clockOutTime, setClockOutTime] = useState(null);
  const openFaceAttendance = () => {
    setShowFaceModal(true);
  };

  const closeFaceAttendance = () => {
    setShowFaceModal(false);
  };

  const handleCheckout = async () => {
    try {
      const user_name = JSON.parse(localStorage.getItem("user")).username;

      const response = await axios.post(
        `http://localhost:5050/api/update-attendance/${user_name}`
      );

      if (response.data.clockOut) {
        setClockOutTime(response.data.clockOut);
        alert("Clock out successful: " + response.data.clockOut);
      }
    } catch (error) {
      console.error("Error during checkout", error);
      alert("Failed to check out");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 relative">
        <Header />
        <div className="flex justify-end gap-4 mb-4 px-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer"
            onClick={openFaceAttendance}
          >
            Check In
          </button>

          <button
            className="bg-white border px-4 py-2 rounded cursor-pointer"
            onClick={handleCheckout}
          >
            {clockOutTime ? `Checked Out: ${clockOutTime}` : "Check Out"}
          </button>
        </div>

        {/* Show table */}
        {user?.role === "admin" ? <AttendanceTable /> : <UserAttendance />}

        {/* Modal */}
        {showFaceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                onClick={closeFaceAttendance}
              >
                &times;
              </button>
              <FaceAttendance />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
