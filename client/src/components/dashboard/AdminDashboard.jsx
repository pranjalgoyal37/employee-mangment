export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-400 p-4 rounded shadow text-white">
          Employees: 12
        </div>
        <div className="bg-amber-400 p-4 rounded shadow">Tasks Pending: 4</div>
        <div className="bg-green-600 p-4 rounded shadow">Leaves Today: 2</div>
      </div>
    </div>
  );
}
