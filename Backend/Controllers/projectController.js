//import project from "../models/project.js";
const Project = require("../models/Project");

// ✅ Create Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      projectName: req.body.projectName,
      description: req.body.description,
      owner: req.user ? req.user._id : null, // assuming user is attached from auth middleware
      members: req.body.members || [],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // or your DB logic
    res.json(projects);
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Project
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

     /* check ownership or roles
    const canEdit =
      project.owner.equals(req.user._id) ||
      ["admin", "manager"].includes(req.user.role);

    if (!canEdit) {
      return res.status(403).json({ message: "Forbidden access" });
    }
*/
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Project not found");
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send("Server error");
  }
};
