// ExpectedCost.js

const mongoose = require("mongoose");

const expectedCostSchema = new mongoose.Schema({
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

const ExpectedCost = mongoose.model("ExpectedCost", expectedCostSchema);

module.exports = ExpectedCost;
