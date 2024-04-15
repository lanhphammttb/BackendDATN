const ExpectedCost = require("../models/ExpectedCost");

const expectedCostController = {
  getExpectedCosts: async (req, res) => {
    try {
      const expectedCosts = await ExpectedCost.find().populate("category_id");
      return res.status(200).json(expectedCosts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getExpectedCostById: async (req, res) => {
    try {
      const expectedCostId = req.params.id;

      const expectedCost = await ExpectedCost.findById(expectedCostId).populate(
        "category_id"
      );
      if (!expectedCost) {
        return res.status(404).json({ message: "Expected cost không tồn tại" });
      }

      return res.status(200).json(expectedCost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  createExpectedCost: async (req, res) => {
    try {
      const {
        description,
        date,
        category_id,
        quantity,
        price,
        totalAmount,
        note,
      } = req.body;

      // Kiểm tra xem category_id có tồn tại không
      const existingCategory = await Category.findById(category_id);
      if (!existingCategory) {
        return res.status(400).json({ message: "Category không tồn tại" });
      }

      // Tạo expected cost mới
      const newExpectedCost = new ExpectedCost({
        description,
        date,
        category_id,
        quantity,
        price,
        totalAmount,
        note,
      });

      // Lưu expected cost vào cơ sở dữ liệu
      await newExpectedCost.save();

      return res
        .status(201)
        .json({ message: "Expected cost đã được tạo thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  updateExpectedCost: async (req, res) => {
    try {
      const expectedCostId = req.params.id;
      const {
        description,
        date,
        category_id,
        quantity,
        price,
        totalAmount,
        note,
      } = req.body;

      // Kiểm tra xem expected cost có tồn tại không
      const existingExpectedCost = await ExpectedCost.findById(expectedCostId);
      if (!existingExpectedCost) {
        return res.status(404).json({ message: "Expected cost không tồn tại" });
      }

      // Kiểm tra xem category_id có tồn tại không
      const existingCategory = await Category.findById(category_id);
      if (!existingCategory) {
        return res.status(400).json({ message: "Category không tồn tại" });
      }

      // Cập nhật thông tin expected cost
      existingExpectedCost.description = description;
      existingExpectedCost.date = date;
      existingExpectedCost.category_id = category_id;
      existingExpectedCost.quantity = quantity;
      existingExpectedCost.price = price;
      existingExpectedCost.totalAmount = totalAmount;
      existingExpectedCost.note = note;

      // Lưu thông tin expected cost đã cập nhật vào cơ sở dữ liệu
      await existingExpectedCost.save();

      return res
        .status(200)
        .json({ message: "Expected cost đã được cập nhật thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  deleteExpectedCost: async (req, res) => {
    try {
      const expectedCostId = req.params.id;

      // Kiểm tra xem expected cost có tồn tại không
      const existingExpectedCost = await ExpectedCost.findById(expectedCostId);
      if (!existingExpectedCost) {
        return res.status(404).json({ message: "Expected cost không tồn tại" });
      }

      // Xóa expected cost
      await existingExpectedCost.remove();

      return res
        .status(200)
        .json({ message: "Expected cost đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getExpectedCostsByKeyword: async (req, res) => {
    try {
      const keyword = req.query.keyword;

      const expectedCosts = await ExpectedCost.find({
        $or: [
          { description: { $regex: keyword, $options: "i" } },
          { note: { $regex: keyword, $options: "i" } },
        ],
      }).populate("category_id");

      return res.status(200).json(expectedCosts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

module.exports = expectedCostController;
