const express = require('express');
const proj = require("../controllers/projectController");
const authorize = require("../middleware/role");
const protect = require("../middleware/auth");
const router = express.Router();

router.get("/", proj.getProjects);
router.post("/create",/*authorize(['admin','user','manager']) ,*/proj.createProject);
router.put("/update/:id", proj.updateProject);
router.delete("/delete/:id", proj.deleteProject);

module.exports=router
