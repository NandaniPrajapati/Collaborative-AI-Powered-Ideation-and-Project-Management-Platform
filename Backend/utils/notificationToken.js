require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// Fake payload for testing
const payload = {
  id: Math.floor(Math.random() * 10000).toString(),
  email: "testuser@example.com",
};

// Generate JWT
const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

console.log("Generated Token:");
console.log(token);
