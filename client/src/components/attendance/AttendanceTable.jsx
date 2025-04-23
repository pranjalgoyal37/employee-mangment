// AttendanceTable.jsx
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import axios from "axios";

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "present":
      return <FaCheckCircle className="text-green-600" />;
    case "absent":
      return <FaTimesCircle className="text-red-600" />;
    case "halfday":
      return <FaStar className="text-orange-400" />;
    default:
      return null;
  }
};

export default function AttendanceTable() {
  const [month, setMonth] = useState("March");
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
    <div className="p-6 w-full overflow-x-auto">
      <h1 className="text-4xl font-bold mb-2">ATTENDANCE</h1>
      <p className="text-green-600 font-medium">Attendance Sheets</p>

      <div className="mt-6 mb-4 flex items-center gap-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        {/* <button className="bg-black text-white px-4 py-2 rounded shadow">
          SEARCH
        </button> */}
      </div>

      <div className="flex flex-col flex-1">
        {/* <h1 className="text-xl font-bold mb-4">User Attendance</h1> */}
        <div className="bg-white shadow-md rounded p-4 overflow-auto flex-1">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Check-In</th>
                <th className="p-2 text-left">working-hour</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.user_name}</td>
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.clockIn || "-"}</td>
                  <td className="p-2">
                    {item.clockIn && item.clockOut
                      ? (() => {
                          const parseTime = (timeStr) => {
                            const [time, modifier] = timeStr.split(" ");
                            let [hours, minutes, seconds] = time
                              .split(":")
                              .map(Number);

                            if (modifier === "PM" && hours !== 12) {
                              hours += 12;
                            }
                            if (modifier === "AM" && hours === 12) {
                              hours = 0;
                            }

                            return new Date(0, 0, 0, hours, minutes, seconds);
                          };

                          const inTime = parseTime(item.clockIn);
                          const outTime = parseTime(item.clockOut);
                          const diffMs = outTime - inTime;

                          if (diffMs < 0) return "-";

                          const hours = Math.floor(diffMs / (1000 * 60 * 60));
                          const minutes = Math.floor(
                            (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                          );

                          return `${hours}h ${minutes}m`;
                        })()
                      : "-"}
                  </td>
                  <td className="p-2">{getStatusIcon(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
