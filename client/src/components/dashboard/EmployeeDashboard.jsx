import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../Sidebar";

const weeklyData = [
  { name: "Mon", task: 12, activity: 24 },
  { name: "Tue", task: 18, activity: 27 },
  { name: "Wed", task: 7, activity: 27 },
  { name: "Thu", task: 22, activity: 23 },
  { name: "Fri", task: 22, activity: 23 },
  { name: "Sat", task: 9, activity: 15 },
  { name: "Sun", task: 5, activity: 9 },
];

const pieData = [
  { name: "Pending", value: 60, color: "#3B82F6" },
  { name: "In Progress", value: 20, color: "#10B981" },
  { name: "Completed", value: 20, color: "#FBBF24" },
];

const EmployeeDashboard = () => {
  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <Sidebar />
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Employees</p>
          <h3 className="text-2xl font-bold">4</h3>
          <div className="mt-2 text-sm text-gray-500">Active Status</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Active Tasks</p>
          <h3 className="text-2xl font-bold">4</h3>
          <div className="mt-2 text-sm text-gray-500">Completion Rate</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Today's Attendance</p>
          <h3 className="text-2xl font-bold">18/20</h3>
          <div className="mt-2 text-sm text-gray-500">Attendance Rate</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: "90%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="task" fill="#3B82F6" />
              <Bar dataKey="activity" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Task Status Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-2 text-sm">
            {pieData.map((entry, index) => (
              <span key={index} className={`text-[${entry.color}]`}>
                {entry.name} {entry.value}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
