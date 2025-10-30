import { useState, useEffect } from "react";
//import { useProjects } from "../context/projectContext";
import Projects from "./Projects";
import ReactSelect from 'react-select';
import Sidebar from "../Components/Sidebar";
import axios from 'axios';
export default function ProjectForm() {
  const [projectName, setProjectName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [owner, setOwner] = useState('');
  const [members, setMembers] = useState('');
  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
   await axios.post( 'http://localhost:5000/api/projects/create',
    {projectName, description, owner,members } , {
      headers: {
        "Content-Type": "application/json"}}
        ) 
   

       .then(result =>{console.log('Project created:', result.data)
       alert("Project created successfully!");
      
   })
   
    .catch(err =>{console.error('Error creating project:', err)
    alert("Something went wrong! Please try again.");
  }
    );

   
  };

  return (
    <>
     <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Project Name"
        name="projectName"
        onChange={(e)=>setProjectName(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <textarea
        placeholder="Project Description"
        name="description"
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

        required
      />

        <input
        type="text"
        placeholder="Project Owner"
        name="owner"
        onChange={(e)=>setOwner(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

    
      /> 
      <input
        type="text"
        placeholder="members"
        name="members"
        onChange={(e)=>setMembers(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

       
      />
     


      <button  onClick={handleSubmit} type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Project
      </button>
    </form>
    </div>
    </div>
    </>
  );
}