// GroupCategory.js

const mongoose = require("mongoose");

const groupCategorySchema = new mongoose.Schema({
  namegroup: {
    type: String,
    required: true,
  },
  groupID: {
    type: String,
    required: true,
    unique: true,
  },
  listcategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListCategory",
    },
  ],
});

const GroupCategory = mongoose.model("GroupCategory", groupCategorySchema);

module.exports = GroupCategory;
