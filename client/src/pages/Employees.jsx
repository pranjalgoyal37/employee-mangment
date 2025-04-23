import { useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AddEmployeeForm from "../components/AddEmployeeForm";
// import axios from "axios"
export default function Employees() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleAddEmployee = async (newEmployee) => {
    try {
      const res = await fetch("http://localhost:5050/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      const data = await res.json();
      if (res.ok) {
        setShowForm(false);
      } else {
        console.error("Failed to add employee:", data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <span>➕</span> Add Employee
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <AddEmployeeForm onSubmit={handleAddEmployee} />
            </div>
          )}

          <EmployeesTable />
        </main>
      </div>
    </div>
  );
}
