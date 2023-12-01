const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const groupCategoryRoutes = require("./routes/groupCategoryRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional
app.use(cors());
const upload = multer();

// Kết nối MongoDB
mongoose.connect(
  "mongodb+srv://lanhphammttb:lanh123@lanhpham.xs8cpwm.mongodb.net/Test_API",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Sử dụng middleware và routes
app.use("/api/v1/users", upload.none(), userRoutes);
app.use("/api/v1/accounts", upload.none(), accountRoutes);
app.use("/api/v1/groupcategories", upload.none(), groupCategoryRoutes);
app.use("/api/v1/categories", upload.none(), categoryRoutes);
app.use("/api/v1/expenses", upload.none(), expenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
