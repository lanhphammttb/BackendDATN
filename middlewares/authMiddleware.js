<<<<<<< HEAD
// authMiddleware.js

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
=======
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = authMiddleware;
>>>>>>> main
