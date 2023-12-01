const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Kiểm tra xem người dùng đã tồn tại chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Người dùng đã tồn tại" });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Lưu người dùng vào cơ sở dữ liệu
      await newUser.save();

      // Tạo và ký JWT
      const token = jwt.sign({ userId: newUser._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return res
        .status(201)
        .json({ message: "Người dùng đã được đăng ký thành công", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Tìm kiếm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Người dùng không tồn tại" });
      }

      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mật khẩu không chính xác" });
      }

      // Tạo và ký JWT
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },

  getProfile: async (req, res) => {
    try {
      // Lấy thông tin người dùng từ token
      const userId = req.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      // Trả về thông tin người dùng
      return res.status(200).json({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

module.exports = userController;
