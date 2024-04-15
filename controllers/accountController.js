const Account = require("../models/Account");

const accountController = {
  getAccounts: async (req, res) => {
    try {
      const userId = req.userId;
      let accounts;

      // Kiểm tra xem có từ khóa tìm kiếm không
      if (req.query.keyword) {
        const keyword = req.query.keyword;
        accounts = await Account.find({
          userId,
          $or: [
            { accountNumber: { $regex: keyword, $options: "i" } }, // Tìm kiếm theo số tài khoản (không phân biệt chữ hoa, thường)
            { accountType: { $regex: keyword, $options: "i" } }, // Tìm kiếm theo loại tài khoản (không phân biệt chữ hoa, thường)
          ],
        });
      } else {
        // Nếu không có từ khóa, lấy tất cả các tài khoản
        accounts = await Account.find({ userId });
      }

      return res.status(200).json(accounts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getAccountById: async (req, res) => {
    try {
      const accountId = req.params.id;

      // Kiểm tra xem tài khoản có tồn tại không
      const account = await Account.findOne({
        _id: accountId,
        userId: req.userId,
      });
      if (!account) {
        return res.status(404).json({ message: "Tài khoản không tồn tại" });
      }

      return res.status(200).json(account);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  createAccount: async (req, res) => {
    try {
      const { accountNumber, balance, accountType } = req.body;
      const userId = req.userId;

      // Kiểm tra xem tài khoản đã tồn tại chưa
      const existingAccount = await Account.findOne({ accountNumber });
      if (existingAccount) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại" });
      }

      // Tạo tài khoản mới
      const newAccount = new Account({
        userId,
        accountNumber,
        balance,
        accountType,
      });

      // Lưu tài khoản vào cơ sở dữ liệu
      await newAccount.save();

      return res
        .status(201)
        .json({ message: "Tài khoản đã được tạo thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  updateAccount: async (req, res) => {
    try {
      const accountId = req.params.id;
      const { accountNumber, balance, accountType } = req.body;

      // Kiểm tra xem tài khoản có tồn tại không
      const existingAccount = await Account.findOne({
        _id: accountId,
        userId: req.userId,
      });
      if (!existingAccount) {
        return res.status(404).json({ message: "Tài khoản không tồn tại" });
      }

      // Cập nhật thông tin tài khoản
      existingAccount.accountNumber = accountNumber;
      existingAccount.balance = balance;
      existingAccount.accountType = accountType;

      // Lưu thông tin tài khoản đã cập nhật vào cơ sở dữ liệu
      await existingAccount.save();

      return res
        .status(200)
        .json({ message: "Tài khoản đã được cập nhật thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const accountId = req.params.id;

      // Kiểm tra xem tài khoản có tồn tại không
      const existingAccount = await Account.findOne({
        _id: accountId,
        userId: req.userId,
      });
      if (!existingAccount) {
        return res.status(404).json({ message: "Tài khoản không tồn tại" });
      }

      // Xóa tài khoản
      await existingAccount.remove();

      return res
        .status(200)
        .json({ message: "Tài khoản đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

module.exports = accountController;
