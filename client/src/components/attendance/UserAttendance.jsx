import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Star } from "lucide-react";
import axios from "axios";

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "present":
      return <CheckCircle className="text-green-500" />;
    case "absent":
      return <XCircle className="text-red-500" />;
    case "halfday":
      return <Star className="text-yellow-500" />;
    default:
      return null;
  }
};

const UserAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/attendance");
        setAttendanceData(res.data);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* <h1 className="text-xl font-bold mb-4">User Attendance</h1> */}
      <div className="bg-white shadow-md rounded p-4 overflow-x-auto flex-1">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Check-In</th>
              <th className="p-2 text-left">Check-Out</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.clockIn || "-"}</td>
                <td className="p-2">{item.clockOut || "-"}</td>
                <td className="p-2">{getStatusIcon(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendance;
