const ExpenseGroup = require('../models/expenseGroup');

// Lấy tất cả nhóm chi tiêu
exports.getExpenseGroups = (req, res) => {
  ExpenseGroup.find()
    .populate('parentId')
    .exec((err, expenseGroups) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(expenseGroups);
      }
    });
};

// Tạo một nhóm chi tiêu mới
exports.createExpenseGroup = (req, res) => {
  const { name, parentId } = req.body;

  const expenseGroup = new ExpenseGroup({
    name,
    parentId,
  });

  expenseGroup.save((err, savedExpenseGroup) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(savedExpenseGroup);
    }
  });
};
