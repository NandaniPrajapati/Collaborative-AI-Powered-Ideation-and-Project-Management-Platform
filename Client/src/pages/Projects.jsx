import { useEffect, useState } from "react";
import axios from "axios";// ✅
import { Link } from "react-router-dom";
//import { useProjects } from "../context/projectContext";
import ProjectForm from "../pages/ProjectForm";
import Sidebar from "../Components/Sidebar";
export  default function Projects() {

  //const { projects, removeProject } = useProjects();
  //const [editing, setEditing] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({
    projectName: "",
    description: "",
    owner: "",
    members:""
  });

  // Fetch all projects
  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/delete/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Start editing
  const handleEditClick = (project) => {
    setEditingProject(project._id);
    setEditForm({
      projectName: project.projectName,
      description: project.description,
      owner: project.owner,
      members:project.members
    });
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/projects/update/${editingProject}`,
        editForm
      );
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };
 

  return (
    <div className="flex h-screen">
    <Sidebar/>
    <div className="flex-1 flex  overflow-y-auto flex-col">
    <div className="max-w-5xl mx-auto p-6">
      
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        🚀 Project Dashboard
      </h2>
      <Link to="/pages/ProjectForm"> <button   className="w-40 bg-indigo-600  px-4  ml-160 my-1 py-2 text-white font-semibold  rounded-lg hover:bg-indigo-700 transition duration-300 ">
        + New Project
      </button> </Link>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  overflow-y-scroll pr-2  ">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {editingProject === proj._id ? (
                // Edit form
                <form onSubmit={handleEditSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={editForm.projectName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, projectName: e.target.value })
                    }
                    placeholder="Project Name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    placeholder="Description"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={editForm.owner}
                    onChange={(e) =>
                      setEditForm({ ...editForm, owner: e.target.value })
                    }
                    placeholder="Project Owner"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={editForm.members}
                    onChange={(e) =>
                      setEditForm({ ...editForm, members: e.target.value })
                    }
                    placeholder="Members"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      💾 Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {proj.projectName}
                  </h3>
                  <p className="text-gray-600 mt-2">{proj.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    👤 Project Owner: {proj.owner}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    👤 Members: {proj.members}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEditClick(proj)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

     
    </div>
    </div>
  );
}
