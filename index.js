// app.js

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const expenseGroupRoutes = require('./routes/expenseGroupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');
const app = express();
app.use(cors());
const upload = multer();

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://lanhphammttb:lanh123@lanhpham.xs8cpwm.mongodb.net/DA_TN',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Use auth routes
app.use('/api/v1/users', upload.none(), userRoutes);
app.use('/api/v1/expense-groups', upload.none(), expenseGroupRoutes);
app.use('/api/v1/expenses', upload.none(), expenseRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
