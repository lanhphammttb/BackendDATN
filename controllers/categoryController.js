const Category = require("../models/Category");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({ group_id: req.query.group_id });
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;

      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category không tồn tại" });
      }

      return res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { group_id, date, value, description } = req.body;

      // Tạo category mới
      const newCategory = new Category({
        group_id,
        date,
        value,
        description,
      });

      // Lưu category vào cơ sở dữ liệu
      await newCategory.save();

      return res
        .status(201)
        .json({ message: "Category đã được tạo thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { group_id, date, value, description } = req.body;

      // Kiểm tra xem category có tồn tại không
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category không tồn tại" });
      }

      // Cập nhật thông tin category
      existingCategory.group_id = group_id;
      existingCategory.date = date;
      existingCategory.value = value;
      existingCategory.description = description;

      // Lưu thông tin category đã cập nhật vào cơ sở dữ liệu
      await existingCategory.save();

      return res
        .status(200)
        .json({ message: "Category đã được cập nhật thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;

      // Kiểm tra xem category có tồn tại không
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category không tồn tại" });
      }

      // Xóa category
      await existingCategory.remove();

      return res
        .status(200)
        .json({ message: "Category đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

module.exports = categoryController;
