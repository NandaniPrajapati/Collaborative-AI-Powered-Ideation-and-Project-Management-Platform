import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/Pages/Login"); // after register → go to login
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">

<div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
 
    <form onSubmit={handleSubmit} className="p-4 my-11 border rounded max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange}  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      <input name="email" placeholder="Email" onChange={handleChange}  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />
      <input type="password" name="password" placeholder="Password" onChange={handleChange}  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300">Register</button>
       <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          
          <Link   className="text-indigo-600 hover:underline font-medium"to="/Pages/Login">Login</Link> 
         
        </p>
    </form>
    </div>
    </div>
  );
}

export default Register;
