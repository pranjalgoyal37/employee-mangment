export default function TasksPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      <div className="grid gap-4">
        <div className="border rounded p-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Design Homepage</h3>
            <p className="text-sm text-gray-500">
              Deadline: Apr 10 | Priority: High
            </p>
          </div>
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
            Mark as Done
          </button>
        </div>
      </div>
    </div>
  );
}
