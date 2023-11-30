// Income.js

const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  listcategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ListCategory",
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
