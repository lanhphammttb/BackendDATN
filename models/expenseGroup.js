const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expenseGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cần nhập tên nhóm'],
  },
  groupId: {
    type: Number,
    unique: true,
    required: true,
  },
  children: [
    {
      name: {
        type: String,
        required: [true, 'Cần nhập tên nhóm con'],
      },
      groupId: {
        type: Number,
        unique: true,
        required: true,
      },
      parentId: {
        type: Number,
        required: true,
      },
    },
  ],
});

const ExpenseGroup = mongoose.model('ExpenseGroup', expenseGroupSchema);

module.exports = ExpenseGroup;
