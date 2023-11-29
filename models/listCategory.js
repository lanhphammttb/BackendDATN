// ListCategory.js

const mongoose = require("mongoose");

const listCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Thêm các trường khác cho danh mục (tuỳ chọn)
});

const ListCategory = mongoose.model("ListCategory", listCategorySchema);

module.exports = ListCategory;
