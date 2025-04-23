import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/Card/TaskCard";
import AddTaskModal from "../components/Card/AddTaskModal";
import axios from "axios";

const TaskBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const curr_user = JSON.parse(localStorage.getItem("user"));
  const fetchTasks = async () => {
    try {
      const response = await axios("http://localhost:5050/api/task-data");
      const data = response.data;
      console.log(data);
      setTasks(data.tasks);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error?.message || error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateTask = (id, updates) => {
    const updated = tasks.map((task) =>
      task._id === id ? { ...task, ...updates } : task
    );
    setTasks(updated);
  };

  const handleCreateTask = async (task) => {
    try {
      const response = await fetch("http://localhost:5050/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Task created:", data);
        setIsModalOpen(false);
        fetchTasks(); // Refresh tasks
      } else {
        console.error("❌ Failed to create task:", data.message);
      }
    } catch (error) {
      console.error("❌ Error creating task:", error);
    }
  };
  const filteredTasks = tasks.filter((task) => {
    if (curr_user.role !== "admin") {
      return task.assignee.toLowerCase() === curr_user.username.toLowerCase();
    }

    // If role is admin
    if (filter === "All") return true;
    return task.status.toLowerCase() === filter.toLowerCase();
  });

  const tabs = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6"></div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
            {curr_user.role == "admin" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Add Task
              </button>
            )}

            <AddTaskModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              onCreate={handleCreateTask}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md ${
                  filter === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border"
                }`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdateTask} // 🔁 fixed prop
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskBoard;

// <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

// <div className="flex-1">
//   <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//   <main className="p-6">
//     <div className="flex justify-between items-center mb-6"></div>
