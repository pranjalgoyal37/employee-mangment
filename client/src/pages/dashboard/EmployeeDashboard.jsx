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
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
// Define the data for the weekly activity chart
const weeklyActivityData = [
  { name: "Mon", employees: 20, tasks: 10 },
  { name: "Tue", employees: 25, tasks: 15 },
  { name: "Wed", employees: 22, tasks: 17 },
  { name: "Thu", employees: 24, tasks: 14 },
  { name: "Fri", employees: 21, tasks: 19 },
  { name: "Sat", employees: 14, tasks: 10 },
  { name: "Sun", employees: 8, tasks: 5 },
];

// Define the data for the task status pie chart
const taskStatusData = [
  { name: "Pending", value: 60 },
  { name: "In Progress", value: 20 },
  { name: "Complete", value: 20 },
];

// Define the colors for the pie chart
const taskStatusColors = ["#f59e0b", "#3b82f6", "#10b981"];

export default function EmployeeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-600">
                Active Tasks
              </h3>
              <p className="text-3xl font-bold text-green-600">4</p>
              <div className="mt-2 text-sm text-gray-400">Completion Rate</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full w-[20%] bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-600">
                Today's Attendance
              </h3>
              <p className="text-3xl font-bold text-yellow-600">{}</p>
              <div className="mt-2 text-sm text-gray-400">Attendance Rate</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full w-[90%] bg-yellow-500 rounded-full"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-600">
                Total Leaves
              </h3>
              <p className="text-3xl font-bold text-blue-600">{}</p>
              <div className="mt-2 text-sm text-gray-400">Active Status</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-full w-[80%] bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity */}
            <div className="bg-white p-6 rounded-2xl shadow col-span-2">
              <h4 className="text-lg font-semibold mb-4 text-gray-700">
                Weekly Activity
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyActivityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="employees"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="tasks" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Task Status Pie */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="text-lg font-semibold mb-4 text-gray-700">
                Task Status Overview
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={taskStatusColors[index % taskStatusColors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              Recent Activities
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                • Jane Smith marked "Design New Dashboard" as in-progress{" "}
                <span className="text-gray-400 ml-2">14:00</span>
              </li>
              <li>
                • John Doe clocked in{" "}
                <span className="text-gray-400 ml-2">14:30</span>
              </li>
              <li>
                • Robert Johnson submitted a leave request{" "}
                <span className="text-gray-400 ml-2">15:45</span>
              </li>
              <li>
                • Sarah Williams completed "Marketing Plan Review"{" "}
                <span className="text-gray-400 ml-2">17:15</span>
              </li>
              <li>
                • Michael Brown uploaded a new document{" "}
                <span className="text-gray-400 ml-2">19:50</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
