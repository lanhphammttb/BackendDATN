const ExpenseGroup = require('../models/expenseGroup');
const handleResponse = require('../utils/responseHelper');

async function getGroupIdLast() {
  const lastParentGroup = await ExpenseGroup.findOne(
    { parentId: null },
    'groupId'
  )
    .sort({ groupId: -1 })
    .lean();

  const lastChildGroup = await ExpenseGroup.aggregate([
    { $unwind: '$children' },
    { $sort: { 'children.groupId': -1 } },
    { $limit: 1 },
    { $project: { _id: 0, groupId: '$children.groupId' } },
  ]);

  const lastGroupId = Math.max(
    lastParentGroup?.groupId || 0,
    lastChildGroup?.[0]?.groupId || 0
  );
  newGroupId = lastGroupId + 1;
  return newGroupId;
}

// Lấy tất cả nhóm chi tiêu
exports.getExpenseGroups = (req, res) => {
  ExpenseGroup.find()
    .populate('parentId')
    .then((expenseGroups) => {
      res.status(200).json(expenseGroups);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.createExpenseGroup = async (req, res) => {
  const { name } = req.body;

  try {
    const newGroupId = await getGroupIdLast();

    const expenseGroup = new ExpenseGroup({
      name,
      groupId: newGroupId,
    });

    const savedExpenseGroup = await expenseGroup.save();
    savedExpenseGroup.__v = undefined;
    await handleResponse(
      res,
      savedExpenseGroup,
      'Tạo nhóm mới thành công',
      null
    );
  } catch (err) {
    await handleResponse(res, null, null, err);
  }
};

//tạo nhóm chi tiêu con
exports.createChildExpenseGroup = async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const parentExpenseGroup = await ExpenseGroup.findOne({
      groupId: parentId,
    });
    if (!parentExpenseGroup) {
      return res.status(404).json({ error: 'id nhóm cha không tồn tại' });
    }

    const newGroupId = await getGroupIdLast();
    const newChildGroup = {
      name,
      groupId: newGroupId,
      parentId: parentExpenseGroup.groupId,
    };
    newChildGroup.__v = undefined;
    parentExpenseGroup.children.push(newChildGroup);
    await parentExpenseGroup.save();

    await handleResponse(
      res,
      newChildGroup,
      'Tạo nhóm con mới thành công',
      null
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
