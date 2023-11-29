// userRoutes.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected route - Get user profile
router.get(
  "/profile",
  authMiddleware.authenticateToken,
  UserController.getUserProfile
);

// Create a new account for a user
router.post(
  "/accounts",
  authMiddleware.authenticateToken,
  UserController.createAccount
);

// Get a list of accounts for a user
router.get(
  "/accounts",
  authMiddleware.authenticateToken,
  UserController.getAccounts
);

// Create a new group category
router.post(
  "/groupcategories",
  authMiddleware.authenticateToken,
  UserController.createGroupCategory
);

// Get a list of group categories
router.get(
  "/groupcategories",
  authMiddleware.authenticateToken,
  UserController.getGroupCategories
);

// Create a new expected cost
router.post(
  "/expectedcosts",
  authMiddleware.authenticateToken,
  UserController.createExpectedCost
);

// Get a list of expected costs
router.get(
  "/expectedcosts",
  authMiddleware.authenticateToken,
  UserController.getExpectedCosts
);

// Create a new income
router.post(
  "/incomes",
  authMiddleware.authenticateToken,
  UserController.createIncome
);

// Get a list of incomes
router.get(
  "/incomes",
  authMiddleware.authenticateToken,
  UserController.getIncomes
);

// Create a new expense cost
router.post(
  "/expensecosts",
  authMiddleware.authenticateToken,
  UserController.createExpenseCost
);

// Get a list of expense costs
router.get(
  "/expensecosts",
  authMiddleware.authenticateToken,
  UserController.getExpenseCosts
);

module.exports = router;
