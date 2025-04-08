export default function AttendancePage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <div className="space-y-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Check-In
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Check-Out
        </button>
        <p className="text-sm text-gray-600">Working Hours Today: 3h 20m</p>
      </div>
    </div>
  );
}
