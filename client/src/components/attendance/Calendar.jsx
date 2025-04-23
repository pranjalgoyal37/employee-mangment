// components/Calendar.jsx
import React from "react";

export default function Calendar({ currentDate }) {
  const today = new Date().getDate();
  const totalDays = 30;

  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-lg font-semibold mb-4">
        {currentDate.toLocaleString("default", { month: "long" })}{" "}
        {currentDate.getFullYear()}
      </p>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const isToday = day === today;
          return (
            <div
              key={day}
              className={`py-2 rounded-full ${
                isToday
                  ? "bg-gray-800 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
