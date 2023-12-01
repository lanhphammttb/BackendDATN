const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const groupCategoryRoutes = require("./routes/groupCategoryRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
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
app.use("/api/v1/accounts", upload.none(), accountRoutes);
app.use("/api/v1/groupcategories", upload.none(), groupCategoryRoutes);
app.use("/api/v1/categories", upload.none(), categoryRoutes);
app.use("/api/v1/expenses", upload.none(), expenseRoutes);

// Start the server
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
