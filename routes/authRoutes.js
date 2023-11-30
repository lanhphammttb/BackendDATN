// authRoutes.js

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// User registration route
router.post("/register", AuthController.registerUser);

// User login route
router.post("/login", AuthController.loginUser);

module.exports = router;
