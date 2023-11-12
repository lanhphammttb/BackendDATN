const Expense = require('../models/expense');

// Lấy tất cả chi tiêu
exports.getExpenses = (req, res) => {
  Expense.find()
    .populate('groupId')
    .exec((err, expenses) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(expenses);
      }
    });
};

// Tạo một chi tiêu mới
exports.createExpense = (req, res) => {
  const { description, groupId } = req.body;

  const expense = new Expense({
    description,
    groupId,
  });

  expense.save((err, savedExpense) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(savedExpense);
    }
  });
};
