const mongoose = require('mongoose');

const expenseGroupSchema = new mongoose.Schema({
  name: String,
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpenseGroup',
  },
});

const ExpenseGroup = mongoose.model('ExpenseGroup', expenseGroupSchema);

module.exports = ExpenseGroup;
