import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const user1 = {
    name: "Nandani Prajapati",
    email: "nandani@example.com",
    role: "Frontend Developer",
    projects: [
      {
        name: "AI Chatbot System",
        status: "Completed",
        progress: 100,
      },
      {
        name: "Project Management Platform",
        status: "In Progress",
        progress: 70,
      },
      {
        name: "Workshop Feedback System",
        status: "Pending",
        progress: 25,
      },
    ],
  };
  const handleLogout = async () => {
   

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Clear token locally
      localStorage.removeItem("token");

      // ✅ Redirect
      navigate("/Pages/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/Pages/Login"); // if no token → redirect
          return;
        }

        const res = await axios.post("http://localhost:5000/api/users/me", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        navigate("/Pages/Login"); // token invalid → back to login
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen ">
      <Sidebar/> 
      <div className="flex-1 flex flex-col overflow-y-auto">
    <div className="p-6 md:p-10 bg-gray-100  text-white">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">⚙️ Settings / Profile</h1>
        
      <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">👤 Name</h2>
            <p className="bg-gray-700 p-3 rounded">{user.name}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
            <p className="bg-gray-700 p-3 rounded">{user.email}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 ">🧩 Role</h2>
            <span
              className={`inline-block px-4 py-2   rounded-full text-sm font-medium ${
                user.role === "admin"
                  ? "bg-red-600 text-white"
                  : user.role === "manager"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-600 text-white"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>
{/*
      <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
          Logout
        </button>
            */}
                 {/* Projects Section */}
        <div className="mt-8 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Project Assignments
          </h2>

          <div className="space-y-4">
            {user1.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm transition-all"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-700">
                    {project.name}
                  </h3>
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
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
                  <div
                    className={`h-3 rounded-full ${
                      project.progress === 100
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {project.progress}% completed
                </p>
              </div>
            ))}
          </div>
        </div>
          {/* Assigned Tasks 
          <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">🗂 Assigned Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks assigned yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 border border-gray-700 rounded-xl">
                <thead className="bg-gray-700 text-gray-300">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Task Name</th>
                    <th className="p-3 text-left">Project</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task._id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{task.taskName}</td>
                      <td className="p-3">{task.projectName || "N/A"}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            task.status === "Completed"
                              ? "bg-green-600"
                              : task.status === "Pending"
                              ? "bg-yellow-500 text-black"
                              : "bg-blue-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        */}
        </div>
    </div>
    </div>
    </div>
    
  );
}

export default Profile;
