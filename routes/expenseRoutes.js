const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/getExpenses', expenseController.getExpenses);
router.post('/createExpense', expenseController.createExpense);

module.exports = router;
