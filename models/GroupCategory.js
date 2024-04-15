const mongoose = require("mongoose");

const groupCategorySchema = new mongoose.Schema({
  namegroup: { type: String, required: true },
  group_id: { type: String, required: true, unique: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Tham chiếu đến danh sách các category
});

const GroupCategory = mongoose.model("GroupCategory", groupCategorySchema);

module.exports = GroupCategory;
