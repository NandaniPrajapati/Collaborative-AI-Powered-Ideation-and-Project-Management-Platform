import React from "react";
import Sidebar from "../Components/Sidebar";
export default function Tasks(){
   const tasks = [
      { id: 1, title: "Design UI", status: "Completed" },
      { id: 2, title: "Build API", status: "In Progress" },
      { id: 3, title: "Testing", status: "Pending" },
    ]
     return(
      <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Tasks</h1>
      <ul className="space-y-4">
        {tasks.map((t) => (
          <li key={t.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <span>{t.title}</span>
            <span
              className={`px-3 py-1 text-sm rounded ${
                t.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : t.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {t.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
     
}