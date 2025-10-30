const express = require('express');
const {generateIdea,getIdeas,deleteIdea} = require('../Controllers/ideaController');
const router =express.Router();
router.post("/generateIdea",generateIdea)
router.get("/getIdeas",getIdeas)
router.delete("/deleteIdea/:id",deleteIdea)
module.exports=router