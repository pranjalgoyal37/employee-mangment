import React from "react";
import {
  Home,
  Users,
  ClipboardList,
  MessageCircle,
  CalendarCheck,
  LogOut,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm px-4 py-6">
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-blue-600 text-white px-2 py-1 rounded text-lg font-bold">
          EMS
        </div>
        <span className="text-xl font-semibold text-gray-800">WorkWise</span>
      </div>

      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-white bg-blue-600"
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>
        <Link
          to="/employees"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <Users className="w-5 h-5" /> Employees
        </Link>
        <Link
          to="/tasks"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <ClipboardList className="w-5 h-5" /> Tasks
        </Link>
        <Link
          to="/chat"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <MessageCircle className="w-5 h-5" /> Chat
        </Link>
        <Link
          to="/attendance"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <CalendarCheck className="w-5 h-5" /> Attendance
        </Link>
        <Link
          to="/leave"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5" /> Leave
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 text-sm px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
