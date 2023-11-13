const Expense = require('../models/expense');
const handleResponse = require('../utils/responseHelper');
// Lấy tất cả chi tiêu
exports.getExpensesBy = async (req, res) => {
  try {
    // Lấy ngày bắt đầu của tháng hiện tại
    // const currentDate = new Date();

    // // Lấy ngày bắt đầu của tháng kế tiếp
    // const nextMonthStart = new Date(
    //   currentDate.getFullYear(),
    //   currentDate.getMonth() + 1,
    //   1
    // );

    // // Lấy ngày bắt đầu của tháng trước
    // const previousMonthStart = new Date(
    //   currentDate.getFullYear(),
    //   currentDate.getMonth() - 1,
    //   1
    // );

    // const expenses = await Expense.find({
    //   date_expense: {
    //     $gte: previousMonthStart.toISOString().split('T')[0],
    //     $lt: nextMonthStart.toISOString().split('T')[0],
    //   },
    // }).select('-__v');
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1

    const expenses = await Expense.aggregate([
      {
        $match: {
          date_expense: {
            $gte: `${currentYear}-01-01`,
            $lt: `${currentYear}-${
              currentMonth + 1 < 10
                ? '0' + (currentMonth + 1)
                : currentMonth + 1
            }-01`,
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: '$date_expense' } },
            },
            month: {
              $month: { $dateFromString: { dateString: '$date_expense' } },
            },
          },
          totalValue: { $sum: '$value' },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
    ]);

    const formattedExpenses = expenses.map((expense) => ({
      year: expense._id.year,
      month: expense._id.month,
      totalValue: expense.totalValue,
    }));

    await handleResponse(res, formattedExpenses, 'Lấy thành công', null);
  } catch (err) {
    await handleResponse(res, null, null, err);
  }
};

// Tạo một chi tiêu mới
exports.createExpense = async (req, res) => {
  const { description, groupId, date_expense, value, walletId } = req.body;
  try {
    const expense = new Expense({
      description,
      groupId,
      date_expense,
      value,
      walletId,
    });

    const savedExpense = await expense.save();
    savedExpense.__v = undefined;

    await handleResponse(
      res,
      savedExpense,
      'Tạo chi tiêu mới thành công',
      null
    );
  } catch (error) {
    await handleResponse(res, null, null, error);
  }
};
