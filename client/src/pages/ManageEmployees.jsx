export default function ManageEmployees() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add New Employee
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row */}
          <tr>
            <td className="p-2">John Doe</td>
            <td className="p-2">john@example.com</td>
            <td className="p-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
