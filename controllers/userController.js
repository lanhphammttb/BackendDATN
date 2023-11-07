const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        // Invalid credentials
        return res
          .status(401)
          .json({ error: 'Thông tin tài khoản hoặc mật khẩu không chính xác' });
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            // Invalid credentials
            return res.status(401).json({ error: 'Nhập sai mật khẩu' });
          }

          // Successful login
          res.json({ message: 'Đăng nhập thành công' });
        })
        .catch((err) => {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((err) => {
      console.error('Error finding user:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password asynchronously.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user object.
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database.
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('User creation error:', error);
    return res.status(500).json({ message: error.message });
  }
};

exports.listUser = async (req, res) => {
  try {
    // Lấy tất cả người dùng từ cơ sở dữ liệu
    const users = await User.find();

    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error retrieving user list:', error);
    return res.status(500).json({ message: error.message });
  }
};
