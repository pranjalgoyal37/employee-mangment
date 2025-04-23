import React from "react";
import { Calendar, Clock, CheckCircle } from "lucide-react"; // optional icons

const TaskCard = ({ task, onUpdate = () => {} }) => {
  console.log(task);

  const handleStatusChange = (status) => {
    onUpdate(task._id, { status });
  };

  // Format date as DD/MM/YYYY
  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-GB");

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-sm border border-gray-100">
      {/* Title + Priority */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
        {task.priority && (
          <span
            className={`text-xs px-8 py-2 rounded-full capitalize ${
              task.priority === "High"
                ? "bg-red-400 font-extrabold"
                : task.priority === "Medium"
                ? "bg-yellow-600"
                : "bg-gray-600"
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>

      {/* Due date + Assignee */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <Calendar className="w-4 h-4" />
        <span>{formattedDate}</span>
      </div>
      <p className="text-sm font-medium text-gray-700 mb-4">{task.assignee}</p>

      {/* Buttons */}
      <div className="flex gap-2 pt-2 border-t mt-3">
        {task.status === "pending" && (
          <button
            onClick={() => handleStatusChange("In Progress")}
            className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
          >
            <Clock className="w-4 h-4" />
            Pending
          </button>
        )}
        {task.status === "In Progress" && (
          <>
            <button
              onClick={() => handleStatusChange("Pending")}
              className="flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition"
            >
              <Clock className="w-4 h-4" />
              Stop
            </button>
            <button
              onClick={() => handleStatusChange("Completed")}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-700 transition"
            >
              <CheckCircle className="w-4 h-4" />
              Complete
            </button>
          </>
        )}
        {task.status === "completed" && (
          <span className="text-green-600 font-semibold text-sm">
            ✅ Completed
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
