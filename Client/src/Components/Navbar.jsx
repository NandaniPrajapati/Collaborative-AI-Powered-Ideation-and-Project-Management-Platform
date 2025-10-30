 
 import React from "react"
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 export default function Navbar(){
  const navigate = useNavigate();
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
    return(
        <>
        <header className="bg-white shadow     flex justify-between items-center p-4">
     
      <h1 className="text-xl font-bold">Project Management </h1>
      
          
      <button  onClick={handleLogout} className="w-20 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300">Logout</button>
    </header> 
        </>
    );

}