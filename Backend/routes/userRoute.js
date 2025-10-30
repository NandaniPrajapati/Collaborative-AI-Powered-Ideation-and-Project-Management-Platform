const express = require('express');
const {getProfile,listUsers} = require('../Controllers/userController');
const protect = require("../middleware/auth");
const authorize = require("../middleware/role");
const { addTokenToBlacklist } = require("../utils/blacklist");

const router =express.Router();
router.post("/me", protect, getProfile)
router.get("/",protect,authorize('admin'),listUsers)
router.post("/logout", protect, (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
  addTokenToBlacklist(token);
  res.json({ message: "Logged out successfully" });
  });
module.exports=router