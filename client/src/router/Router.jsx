import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import EmployeeDashboard from "../pages/dashboard/EmployeeDashboard";
import Employees from "../pages/Employees";
import TaskBoard from "../pages/TaskBoard";
import AttendancePage from "../pages/AttendancePage";
// import AdminAttendance from "../pages/AdminAttendance";
import ChatPage from "../pages/ChatPage";
import Leave from "../pages/Leave";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/tasks" element={<TaskBoard />} />
        {/* <Route path="/admin-attendance" element={<AdminAttendance />} /> */}
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default Router;
