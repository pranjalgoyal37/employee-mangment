import React, { useState } from "react";
import LeaveTable from "../components/leave/LeaveTable";
import Sidebar from "../components/Sidebar";
import LeaveManagment from "../components/leave/LeaveManagment";
import LeaveRequestFrom from "../components/leave/LeaveRequestForm";
export default function Leave() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.role === "admin" ? true : false;
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isAdmin ? <LeaveManagment /> : <LeaveRequestFrom />}
    </div>
  );
}
