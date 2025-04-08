import React from "react";
import { BrowserRouter } from "react-router-dom";

// Auth & Dashboard
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard"; // You can create this
// import HRDashboard from "./pages/HRDashboard"; // Optional

// Core Features
import ManageEmployees from "./pages/ManageEmployees";
import TasksPage from "./pages/TasksPage";
import AttendancePage from "./pages/AttendancePage";
import Router from "./router/Router";
// Shared Components
// import Navbar from "./components/common/Navbar"; // Optional for layout
// import Sidebar from "./components/common/Sidebar"; // Optional

function App() {
  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
