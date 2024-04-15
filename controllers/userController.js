<<<<<<< HEAD
// UserController.js

const User = require("../models/user");
const Account = require("../models/account");

// Get user profile
async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a new account for a user
async function createAccount(req, res) {
  try {
    const { userId } = req.user;

    // Check if the user already has an account
    const existingAccount = await Account.findOne({ userId });

    if (existingAccount) {
      return res.status(409).json({ message: "User already has an account" });
=======
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
>>>>>>> main
    }
  },

<<<<<<< HEAD
    // Generate a random account number
    const accountNumber = generateAccountNumber();

    // Create a new account
    const newAccount = new Account({
      userId,
      accountNumber,
    });

    // Save the account to the database
    await newAccount.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Generate a random 6-digit account number
function generateAccountNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get a list of accounts for a user
async function getAccounts(req, res) {
  try {
    const { userId } = req.user;

    // Find all accounts for the user
    const accounts = await Account.find({ userId });

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a new group category
async function createGroupCategory(req, res) {
  try {
    const { namegroup, groupID, listcategory } = req.body;

    // Create a new group category
    const newGroupCategory = new GroupCategory({
      namegroup,
      groupID,
      listcategory,
    });

    // Save the group category to the database
    await newGroupCategory.save();

    res.status(201).json({ message: "Group category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Get a list of group categories
async function getGroupCategories(req, res) {
  try {
    const groupCategories = await GroupCategory.find().populate("listcategory");

    res.json(groupCategories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a new expected cost
async function createExpectedCost(req, res) {
  try {
    const {
      description,
      date,
      listcategoryID,
      quantity,
      unitPrice,
      totalAmount,
      notes,
    } = req.body;

    // Create a new expected cost
    const newExpectedCost = new ExpectedCost({
      description,
      date,
      listcategoryID,
      quantity,
      unitPrice,
      totalAmount,
      notes,
    });

    // Save the expected cost to the database
    await newExpectedCost.save();

    res.status(201).json({ message: "Expected cost created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Get a list of expected costs
async function getExpectedCosts(req, res) {
  try {
    const expectedCosts = await ExpectedCost.find().populate("listcategoryID");

    res.json(expectedCosts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a new income
async function createIncome(req, res) {
  try {
    const {
      description,
      date,
      listcategoryID,
      quantity,
      unitPrice,
      totalAmount,
      notes,
    } = req.body;

    // Create a new income
    const newIncome = new Income({
      description,
      date,
      listcategoryID,
      quantity,
      unitPrice,
      totalAmount,
      notes,
    });

    // Save the income to the database
    await newIncome.save();

    res.status(201).json({ message: "Income created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Get a list of incomes
async function getIncomes(req, res) {
  try {
    const incomes = await Income.find().populate("listcategoryID");

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a new expense cost
async function createExpenseCost(req, res) {
  try {
    const {
      description,
      date,
      listcategoryID,
      quantity,
      unitPrice,
      totalAmount,
      notes,
    } = req.body;

    // Create a new expense cost
    const newExpenseCost = new ExpenseCost({
      description,
      date,
      listcategoryID,
      quantity,
      unitPrice,
      totalAmount,
      notes,
    });

    // Save the expense cost to the database
    await newExpenseCost.save();

    res.status(201).json({ message: "Expense cost created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Get a list of expense costs
async function getExpenseCosts(req, res) {
  try {
    const expenseCosts = await ExpenseCost.find().populate("listcategoryID");

    res.json(expenseCosts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getUserProfile,
  createAccount,
  getAccounts,
  createGroupCategory,
  getGroupCategories,
  createExpectedCost,
  getExpectedCosts,
  createIncome,
  getIncomes,
  createExpenseCost,
  getExpenseCosts,
=======
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
>>>>>>> main
};

module.exports = userController;
