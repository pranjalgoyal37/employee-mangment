import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

const AddTaskModal = ({ isOpen, setIsOpen, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [userName, setUsers] = useState([]);

  const handleCreate = () => {
    const newTask = {
      title,
      description,
      assignee,
      dueDate,
      priority,
      status: "pending",
    };
    onCreate(newTask);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/usersName");
        setUsers(response.data.names);
      } catch (err) {
        console.error("Error fetching user names:", err);
      }
    };

    fetchUserNames();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 backdrop-blur-sm bg-white/30"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-xl font-semibold text-gray-900">
            Create New Task
          </Dialog.Title>
          <p className="text-sm text-gray-500 mb-4">
            Create a new task and assign it to an employee.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Assign To
              </label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                {/* Add  employee names here */}
                <option value="">Select an employee</option>
                {userName.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              onClick={handleCreate}
            >
              Create Task
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddTaskModal;
