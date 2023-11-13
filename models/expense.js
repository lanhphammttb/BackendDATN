const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  groupId: {
    required: [true, 'Cần nhập id nhóm'],
    type: Number,
    ref: 'ExpenseGroup',
  },
  date_expense: {
    type: String,
    required: [true, 'Cần nhập ngày'],
  },
  value: {
    type: Number,
    required: [true, 'Cần nhập số tiền'],
  },
  walletId: {
    type: Number,
    required: [true, 'Cần nhập ví'],
  },
  description: String,
});

module.exports = mongoose.model('Expense', expenseSchema);
