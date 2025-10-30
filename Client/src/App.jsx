import { useRef,useState ,useEffect  } from 'react'
import { Navigate } from "react-router-dom";
import Admin from './pages/Admin';
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './Pages/UserList';
import Register from"./pages/Register"
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects';
import Tasks from './pages/Tasks'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Profile  from "./Pages/Profile"
//import { ProjectProvider } from './context/ProjectContext';
import ProjectForm from './pages/ProjectForm';
import WhiteBoard from './pages/WhiteBoard';
import IdeaGenerator from './pages/IdeaGenerator';
//import UserList from './Pages/UserList';
import Login from "./pages/Login";
//import Register from "./pages/Register";

function App() {
  /*
  const socket = io('http://localhost:6000', {
    query: { userId: "123" },
    transports: [ 'websocket'],
     // fallback enabled
  });
  useEffect(() => {


// On successful connection
socket.on("connection", (socket) => {
  console.log("✅ Connected:", socket.id);
  console.log("User ID:", socket.handshake.query.userId);

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});

// Listen for notifications
socket.on("receive_notification", (msg) => {
  console.log(" Notification:", msg);
});

// Send a test notification
socket.emit("send_notification", { text: "Hello Shawn" }, (ack) => {
  console.log(" Ack from server:", ack);
});

// Cleanup on unmount
return () => socket.disconnect();

},[]);
*/
   
  // Utility to check authentication
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // true if token exists
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/Pages/Login" replace />;
  }
  return children;
};

  return (
    <>


      <div className="flex h-173  bg-gray-50">
      
        <div className="flex-1   flex flex-col">
          <Navbar />
          <main className="p-6">
         
            <Routes>
             <Route path="/" element={<Navigate to="/Pages/Login" />} />
              <Route path="/Dashboard"   element={<Dashboard />} />
              <Route path="/pages/Projects"  element={<Projects />} />
              <Route path="/pages/tasks" element={<Tasks />} />
              <Route path="/pages/ProjectForm" element={<ProjectForm />} />
              <Route path="/pages/WhiteBoard" element={<WhiteBoard />} />
              <Route path="/pages/IdeaGenerator" element={<IdeaGenerator/>} />
              <Route path="/Pages/login" element={<Login />} />
              <Route path="/Pages/register" element={<Register />} />
              <Route path="/Pages/Admin" element={<Admin />} />
              <Route path="/Pages/UserList" element= {<UserList />  }/>
              
              <Route 
              path="/Pages/profile" element=
               {<ProtectedRoute>
              {<Profile />} 
              </ProtectedRoute>}/>
              
                 
            </Routes>
            
          </main>
        </div>
      </div>


     <div>
      
     </div>
     
    

    </>
  )
}

export default App;
