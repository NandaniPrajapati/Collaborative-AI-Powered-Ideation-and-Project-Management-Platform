import { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "../Components/Sidebar";

function IdeaGenerator() {
    const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState([]);

  // Call POST API
  const generateIdea = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ideas/generateIdea", {
        prompt: idea,
      });
      console.log("Generated idea:", res.data);
    } catch (err) {
      console.error("Error generating idea:", err);
    }
  };

  // Call GET API
  const getIdeas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ideas/getIdeas");
      setIdeas(res.data);
    } catch (err) {
      console.error("Error fetching ideas:", err);
    }
  };
  useEffect(() => {
    getIdeas();
  }, []);

  // Delete idea
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ideas/deleteIdea/${id}`);
      getIdeas();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };
    return (
      <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Idea Generator</h1>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your idea prompt"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
        />
        <div className=" justify-center gap-x-3 my-4 flex">
        <button  onClick={generateIdea}
         className="w-40 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
         Generate Idea</button>

        <button    onClick={getIdeas}
         className="w-40 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
          Get Ideas</button>
          </div>
  <ul className="space-y-4 mt-6 overflow-y-auto">
  {ideas.map((i) => (
    <li
      key={i._id}
      className="p-4   bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition"
    >
      <p className="text-sm text-gray-500">
        <strong className="text-gray-700">Prompt:</strong> {i.prompt}
      </p>
      <p className="mt-2 text-gray-800 whitespace-pre-line">
        <strong className="text-gray-700">AI Response:</strong> {i.aiResponse}
      </p>
      <button onClick={()=>handleDelete(i._id)}
        className ="bg-red-500 text-white px-3 ml-170 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
    </li>
  ))}
</ul>

</div>
      </div>
    );
  }
  
export default IdeaGenerator;