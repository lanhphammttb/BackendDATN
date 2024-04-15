const GroupCategory = require("../models/GroupCategory");
const Category = require("../models/Category");

const groupCategoryController = {
  getGroupCategories: async (req, res) => {
    try {
      const groupCategories = await GroupCategory.find().populate("categories");
      return res.status(200).json(groupCategories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getGroupCategoryById: async (req, res) => {
    try {
      const groupCategoryId = req.params.id;

      const groupCategory = await GroupCategory.findById(
        groupCategoryId
      ).populate("categories");
      if (!groupCategory) {
        return res
          .status(404)
          .json({ message: "Group category không tồn tại" });
      }

      return res.status(200).json(groupCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  createGroupCategory: async (req, res) => {
    try {
      const { namegroup, group_id, categories } = req.body;

      // Kiểm tra xem group_id đã tồn tại chưa
      const existingGroupCategory = await GroupCategory.findOne({ group_id });
      if (existingGroupCategory) {
        return res.status(400).json({ message: "Group category đã tồn tại" });
      }

      // Kiểm tra xem các category có tồn tại không
      const existingCategories = await Category.find({
        _id: { $in: categories },
      });
      if (existingCategories.length !== categories.length) {
        return res
          .status(400)
          .json({ message: "Một hoặc nhiều category không tồn tại" });
      }

      // Tạo group category mới
      const newGroupCategory = new GroupCategory({
        namegroup,
        group_id,
        categories,
      });

      // Lưu group category vào cơ sở dữ liệu
      await newGroupCategory.save();

      return res
        .status(201)
        .json({ message: "Group category đã được tạo thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  updateGroupCategory: async (req, res) => {
    try {
      const groupCategoryId = req.params.id;
      const { namegroup, group_id, categories } = req.body;

      // Kiểm tra xem group category có tồn tại không
      const existingGroupCategory = await GroupCategory.findById(
        groupCategoryId
      );
      if (!existingGroupCategory) {
        return res
          .status(404)
          .json({ message: "Group category không tồn tại" });
      }

      // Kiểm tra xem các category có tồn tại không
      const existingCategories = await Category.find({
        _id: { $in: categories },
      });
      if (existingCategories.length !== categories.length) {
        return res
          .status(400)
          .json({ message: "Một hoặc nhiều category không tồn tại" });
      }

      // Cập nhật thông tin group category
      existingGroupCategory.namegroup = namegroup;
      existingGroupCategory.group_id = group_id;
      existingGroupCategory.categories = categories;

      // Lưu thông tin group category đã cập nhật vào cơ sở dữ liệu
      await existingGroupCategory.save();

      return res
        .status(200)
        .json({ message: "Group category đã được cập nhật thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  deleteGroupCategory: async (req, res) => {
    try {
      const groupCategoryId = req.params.id;

      // Kiểm tra xem group category có tồn tại không
      const existingGroupCategory = await GroupCategory.findById(
        groupCategoryId
      );
      if (!existingGroupCategory) {
        return res
          .status(404)
          .json({ message: "Group category không tồn tại" });
      }

      // Xóa group category
      await existingGroupCategory.remove();

      return res
        .status(200)
        .json({ message: "Group category đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

module.exports = groupCategoryController;
