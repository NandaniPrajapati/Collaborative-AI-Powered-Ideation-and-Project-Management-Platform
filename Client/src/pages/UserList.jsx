import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
function UserList() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch current user and then all users if admin
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
         console.log("token is not here") // if no token → redirect
          
        }
        const profileRes = await axios.post("http://localhost:5000/api/users/me",{}, {
        headers: { Authorization: `Bearer ${token}` },
        });
        setRole(profileRes.data.role);

        // If admin, get all users
        if (profileRes.data.role === "admin") {
          const res = await axios.get("http://localhost:5000/api/users/", {
            headers: { 
              Authorization: `Bearer ${token}`
             },
          });
          setUsers(res.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        alert("Unauthorized or session expired.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center bg-gray-200 mt-8 text-gray-400">Loading...</p>;
  }

  if (role !== "admin") {
    return (
      <div className="flex bg-gray-200 h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">  <h1 className="text-2xl py-70   font-semibold">🚫 Access Denied — Admins Only</h1>
      </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">👥 User Management</h1>

      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-700">
        <table className="min-w-full bg-gray-800 text-sm">
          <thead>
            <tr className="bg-gray-700 text-left text-gray-300">
              <th className="p-3 pl-10 ">#</th>
              <th className="p-3 pl-10 ">Name</th>
              <th className="p-3 pl-30">Email</th>
              <th className="p-3 pl-20">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u._id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      u.role === "admin"
                        ? "bg-red-600 text-white"
                        : u.role === "manager"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}

export default UserList;
