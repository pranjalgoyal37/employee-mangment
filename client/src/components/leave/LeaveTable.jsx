import React from "react";

export default function LeaveTable({ leaves }) {
  console.log(leaves);
  return (
    <div className="mt-4 border rounded">
      <table className="w-full table-auto text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">User Name</th>
            <th className="p-2">Leave Type</th>
            <th className="p-2">Leave Description</th>
            <th className="p-2">Start date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-blue-500 py-4">
                No rows
              </td>
            </tr>
          ) : (
            leaves.map((leave, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{leave.user_name}</td>
                <td className="p-2">{leave.leave_type}</td>
                <td className="p-2">{leave.description}</td>
                <td className="p-2">{leave.start_date}</td>
                <td className="p-2">{leave.end_date}</td>
                {/* <td className="p-2">{""}</td> */}
                <td className="p-2"> Approve | Delete</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
