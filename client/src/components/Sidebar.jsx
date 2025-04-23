import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  ListTodo,
  MessageSquare,
  Calendar,
  Airplay,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const dashboardPath =
    user.role == "admin" ? "/admin/dashboard" : "/employee/dashboard";

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: dashboardPath },
    ...(user.role === "admin"
      ? [{ name: "Employees", icon: <Users size={18} />, path: "/employees" }]
      : []),
    // { name: "Employees", icon: <Users size={18} />, path: "/employees" },
    { name: "Tasks", icon: <ListTodo size={18} />, path: "/tasks" },
    { name: "Chat", icon: <MessageSquare size={18} />, path: "/chat" },
    { name: "Attendance", icon: <Calendar size={18} />, path: "/attendance" },
    { name: "Leave", icon: <Airplay size={18} />, path: "/leave" },
    // { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 h-[screen] w-64 bg-white shadow-lg p-4 border-r border-gray-200 transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold text-blue-600">
            EMS <span className="text-black">Admin</span>
          </div>
          <button className="md:hidden" onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map(({ name, icon, path }) => (
            <NavLink
              to={path}
              key={name}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-100 ${
                  isActive ? "bg-blue-200 text-blue-800" : "text-gray-700"
                }`
              }
            >
              {icon} {name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 border-t pt-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg w-full transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
