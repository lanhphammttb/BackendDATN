const Expense = require("../models/Expenses");

const expenseController = {
  getExpenses: async (req, res) => {
    try {
      const expenses = await Expense.find().populate("category_id");
      return res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getExpenseById: async (req, res) => {
    try {
      const expenseId = req.params.id;

      const expense = await Expense.findById(expenseId).populate("category_id");
      if (!expense) {
        return res.status(404).json({ message: "Expense không tồn tại" });
      }

      return res.status(200).json(expense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  createExpense: async (req, res) => {
    try {
      const {
        description,
        date,
        category_id,
        expenseType,
        quantity,
        price,
        totalAmount,
        note,
      } = req.body;

      // Kiểm tra xem expenseType có hợp lệ không
      if (!["Thu nhập", "Chi tiêu"].includes(expenseType)) {
        return res.status(400).json({ message: "expenseType không hợp lệ" });
      }

      // Kiểm tra xem category_id có tồn tại không
      const existingCategory = await Category.findById(category_id);
      if (!existingCategory) {
        return res.status(400).json({ message: "Category không tồn tại" });
      }

      // Tạo expense mới
      const newExpense = new Expense({
        description,
        date,
        category_id,
        expenseType,
        quantity,
        price,
        totalAmount,
        note,
      });

      // Lưu expense vào cơ sở dữ liệu
      await newExpense.save();

      return res
        .status(201)
        .json({ message: "Expense đã được tạo thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  updateExpense: async (req, res) => {
    try {
      const expenseId = req.params.id;
      const {
        description,
        date,
        category_id,
        expenseType,
        quantity,
        price,
        totalAmount,
        note,
      } = req.body;

      // Kiểm tra xem expense có tồn tại không
      const existingExpense = await Expense.findById(expenseId);
      if (!existingExpense) {
        return res.status(404).json({ message: "Expense không tồn tại" });
      }

      // Kiểm tra xem expenseType có hợp lệ không
      if (!["Thu nhập", "Chi tiêu"].includes(expenseType)) {
        return res.status(400).json({ message: "expenseType không hợp lệ" });
      }

      // Kiểm tra xem category_id có tồn tại không
      const existingCategory = await Category.findById(category_id);
      if (!existingCategory) {
        return res.status(400).json({ message: "Category không tồn tại" });
      }

      // Cập nhật thông tin expense
      existingExpense.description = description;
      existingExpense.date = date;
      existingExpense.category_id = category_id;
      existingExpense.expenseType = expenseType;
      existingExpense.quantity = quantity;
      existingExpense.price = price;
      existingExpense.totalAmount = totalAmount;
      existingExpense.note = note;

      // Lưu thông tin expense đã cập nhật vào cơ sở dữ liệu
      await existingExpense.save();

      return res
        .status(200)
        .json({ message: "Expense đã được cập nhật thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const expenseId = req.params.id;

      // Kiểm tra xem expense có tồn tại không
      const existingExpense = await Expense.findById(expenseId);
      if (!existingExpense) {
        return res.status(404).json({ message: "Expense không tồn tại" });
      }

      // Xóa expense
      await existingExpense.remove();

      return res
        .status(200)
        .json({ message: "Expense đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getExpensesByKeyword: async (req, res) => {
    try {
      const keyword = req.query.keyword;

      const expenses = await Expense.find({
        $or: [
          { description: { $regex: keyword, $options: "i" } },
          { note: { $regex: keyword, $options: "i" } },
        ],
      }).populate("category_id");

      return res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

module.exports = expenseController;
