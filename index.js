"use strict";

const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const expenseGroupRoutes = require("./routes/expenseGroupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const cors = require("cors");

const { db } = require("./config/db");

require("dotenv").config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional
app.use(cors());
const upload = multer();

const PORT = process.env.PORT;

app.use("/api/v1/users", upload.none(), userRoutes);
app.use("/api/v1/auth", upload.none(), authRoutes);
app.use("/api/v1/expense-groups", upload.none(), expenseGroupRoutes);
app.use("/api/v1/expenses", upload.none(), expenseRoutes);

// Start the server
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
