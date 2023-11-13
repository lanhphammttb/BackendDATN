const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

// router.get('/getExpenses', expenseController.getExpenses);
router.get('/getExpensesBy', expenseController.getExpensesBy);
router.post('/createExpense', expenseController.createExpense);

module.exports = router;
