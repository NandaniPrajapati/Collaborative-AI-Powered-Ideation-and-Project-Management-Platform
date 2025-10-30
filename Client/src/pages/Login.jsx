import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Profile  from "../Pages/Profile";
import Sidebar from "../Components/Sidebar";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/Pages/Profile"); // go to profile after login
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">

<div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
    <form onSubmit={handleSubmit} className="p-4  border rounded max-w-sm my-10 mx-auto">
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange}  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
         />
      <button type="submit"  className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
>Login</button>
          <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
            <Link  className="text-indigo-600 hover:underline font-medium" to="/Pages/register">Register</Link> 
         
        </p>
    
    </form>
    </div>
    </div>
  );

}

export default Login;
