const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpenseGroup',
  },
  walletId: Number,
  date_expense: String,
  description: String,
  value: Number,
});

module.exports = mongoose.model('Expense', expenseSchema);
