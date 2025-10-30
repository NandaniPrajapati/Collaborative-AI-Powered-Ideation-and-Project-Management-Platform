const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get token from headers or query
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload to request
    req.user = decoded;

    next(); // pass control to next middleware/route
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
