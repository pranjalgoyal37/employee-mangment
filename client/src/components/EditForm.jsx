import React, { useState, useEffect } from "react";

const EditForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    joiningDate: "",
    status: "active",
    role: "user",
  });

  // Load existing data into form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Edit Employee</h2>
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
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
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
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Update Employee
      </button>
    </form>
  );
};

export default EditForm;
