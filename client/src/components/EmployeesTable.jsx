import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import EditForm from "./EditForm";

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/employee-data");
      const data = res.data;
      if (Array.isArray(data.employees)) {
        setEmployees(data.employees);
      } else {
        console.error("Received data is not an array:", data.employees);
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5050/api/delete-employee/${id}`);
        alert("Employee deleted successfully");
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      } catch (error) {
        alert("Failed to delete employee");
        console.log("User not deleted", error);
      }
    }
  };

  const handleEdit = (id) => {
    const empToEdit = employees.find((emp) => emp._id === id);
    setSelectedEmployee(empToEdit);
    setShowEditForm(true);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      await axios.put(
        `http://localhost:5050/api/update-user/${updatedEmployee._id}`,
        updatedEmployee
      );
      fetchEmployees(); // Refresh the list
      setShowEditForm(false);
      setSelectedEmployee(null);
      alert("Employee updated successfully");
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Failed to update employee");
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search employees by name, email, or department..."
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Joining Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 font-medium">{emp.name}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.department}</td>
                <td className="px-6 py-4">{emp.position}</td>
                <td className="px-6 py-4">{emp.joiningDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      emp.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">{emp.role}</td>
                <td className="px-6 py-4 relative">
                  <div className="relative group inline-block text-left">
                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        setDropdownOpenId(
                          dropdownOpenId === emp._id ? null : emp._id
                        );
                        setSelectedEmployeeId(emp._id);
                      }}
                    >
                      <FiMoreVertical className="text-gray-500 hover:text-gray-800 cursor-pointer" />
                    </button>

                    {dropdownOpenId === emp._id && (
                      <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-32">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleEdit(emp._id)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditForm && selectedEmployee && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[400px]">
            <EditForm initialData={selectedEmployee} onSubmit={handleUpdate} />
            <button
              onClick={() => setShowEditForm(false)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
