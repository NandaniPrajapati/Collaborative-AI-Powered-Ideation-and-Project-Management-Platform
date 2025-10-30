const express = require("express");
const { register, login } = require("../controllers/authController");
//const protect = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);  // public
router.post("/login", login);        // public

// Example protected route
/*router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
}); */

module.exports = router;

