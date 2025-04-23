import React, { useState, useEffect } from "react";

// generate a password
function generateAlphanumericPassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const AddEmployeeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // add password field to state
    department: "",
    position: "",
    joiningDate: "",
    status: "active",
    role: "user",
  });

  // Generate a password once on component mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      password: generateAlphanumericPassword(),
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      password: generateAlphanumericPassword(),
      department: "",
      position: "",
      joiningDate: "",
      status: "active",
      role: "user",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add New Employee</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="password"
        placeholder="Password (auto-generated)"
        value={formData.password}
        readOnly
        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="joiningDate"
        value={formData.joiningDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;
