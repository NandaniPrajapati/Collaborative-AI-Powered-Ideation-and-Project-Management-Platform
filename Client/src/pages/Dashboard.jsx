import React from "react";
//import { Card } from "@/components/ui/card";


import Sidebar from "../Components/Sidebar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Folder, CheckCircle, Clock } from "lucide-react";

export default function Dashboard(){
  const stats = [
    { title: "Total Projects", value: 8, icon: <Folder className="text-blue-500 w-6 h-6" /> },
    { title: "Completed", value: 4, icon: <CheckCircle className="text-green-500 w-6 h-6" /> },
    { title: "In Progress", value: 3, icon: <Clock className="text-yellow-500 w-6 h-6" /> },
  ];

  const projectData = [
    { name: "Completed", value: 4 },
    { name: "In Progress", value: 3 },
    { name: "Pending", value: 1 },
  ];

  const barData = [
    { name: "AI Chatbot", progress: 100 },
    { name: "Project Platform", progress: 70 },
    { name: "Feedback System", progress: 25 },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  const projects = [
    {
      name: "AI Chatbot System",
      status: "Completed",
      progress: 100,
      deadline: "2025-09-20",
    },
    {
      name: "Project Management Platform",
      status: "In Progress",
      progress: 70,
      deadline: "2025-10-25",
    },
    {
      name: "Workshop Feedback App",
      status: "Pending",
      progress: 25,
      deadline: "2025-11-10",
    },
  ];

    return (
        <>
        <div className="flex h-screen ">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <div className="flex min-h-screen bg-gray-100">
     

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <button className="w-40 bg-indigo-600  px-4   my-1 py-2 text-white font-semibold  rounded-lg hover:bg-indigo-700 transition duration-300">
            + New Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md flex items-center justify-between"
            >
              <div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Project Status Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {projectData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Project Completion Progress
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#3b82f6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Projects Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-3 px-2">Project Name</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Progress</th>
                  <th className="py-3 px-2">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-2 font-medium">{project.name}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            project.progress === 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-600">
                      {project.deadline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
        </>
    );
}