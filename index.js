// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const expenseGroupRoutes = require('./routes/expenseGroupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/expense-groups', expenseGroupRoutes);
app.use('/api/v1/expenses', expenseRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
