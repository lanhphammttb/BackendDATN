const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  expenseType: { type: String, enum: ["Thu nhập", "Chi tiêu"], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  note: { type: String },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
