const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  group_id: { type: String, required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  description: { type: String },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
