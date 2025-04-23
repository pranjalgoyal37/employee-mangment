import { useState, useEffect } from "react";
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
import axios from "axios";

const pieData = [
  { name: "Pending", value: 60 },
  { name: "In Progress", value: 20 },
  { name: "Complete", value: 20 },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

export default function AdminDashboard() {
  const weeklyData = [
    { name: "Mon", emp: 30, task: 10 },
    { name: "Tue", emp: 25, task: 15 },
    { name: "Wed", emp: 22, task: 17 },
    { name: "Thu", emp: 24, task: 14 },
    { name: "Fri", emp: 21, task: 19 },
    { name: "Sat", emp: 14, task: 10 },
    { name: "Sun", emp: 8, task: 5 },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeCount, setEmployeeCount] = useState([]);
  const [taskCount, setTaskCount] = useState([]);
  const [presentUserCount, setPresentUserCount] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/dashboard-summary"
        );
        console.log(response.data, response);

        // setEmployees(response.data);
        setEmployeeCount(response.data.total_users);
        setTaskCount(response.data.active_tasks);
        setPresentUserCount(response.data.present_user);

        console.log();

        // setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className=" flex flex-col  flex-1">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-4 md:p-6 space-y-6">
          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Total Employees",
                count: employeeCount,
                color: "blue",
                percent: "80%",
                barWidth: "w-[80%]",
              },
              {
                title: "Active Tasks",
                count: taskCount,
                color: "green",
                percent: "20%",
                barWidth: "w-[20%]",
              },
              {
                title: "Today's Attendance",
                count: `${presentUserCount}/${employeeCount}`,
                color: "yellow",
                percent: "90%",
                barWidth: "w-[90%]",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all"
              >
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  {item.title}
                </h3>
                <p className={`text-4xl font-extrabold text-${item.color}-700`}>
                  {item.count}
                </p>
                <div className="mt-2 text-sm text-gray-400">
                  {item.percent} Rate
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className={`h-full ${item.barWidth} bg-${item.color}-500 rounded-full transition-all duration-300 hover:bg-${item.color}-600`}
                  ></div>
                </div>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Activity Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 col-span-2">
              <h4 className="text-xl font-bold mb-2 text-gray-700">
                Weekly Activity
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emp" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="task" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold mb-2 text-gray-700">
                Task Status Overview
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Activity Feed */}
          <section className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100">
            <h4 className="text-xl font-bold mb-2 text-gray-700">
              Recent Activities
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                [
                  "Jane Smith marked 'Design New Dashboard' as in-progress",
                  "14:00",
                ],
                ["John Doe clocked in", "14:30"],
                ["Robert Johnson submitted a leave request", "15:45"],
                ["Sarah Williams completed 'Marketing Plan Review'", "17:15"],
                ["Michael Brown uploaded a new document", "19:50"],
              ].map(([msg, time], i) => (
                <li key={i} className="flex justify-between">
                  <span>• {msg}</span>
                  <span className="text-gray-400">{time}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
