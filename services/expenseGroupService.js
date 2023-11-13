const ExpenseGroup = require('../models/expenseGroup');

exports.create = async (data) => {
  // Xử lý logic để tạo nhóm mới
  const lastExpenseGroup = await ExpenseGroup.findOne({}, 'parentId').sort({
    parentId: -1,
  });

  const newParentId = lastExpenseGroup ? lastExpenseGroup.parentId + 1 : 1;

  const expenseGroup = new ExpenseGroup({
    name: data.name,
    parentId: newParentId,
  });

  const savedGroup = await expenseGroup.save();

  return savedGroup;
};
