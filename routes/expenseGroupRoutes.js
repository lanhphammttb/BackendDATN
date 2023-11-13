const express = require('express');
const expenseGroupController = require('../controllers/expenseGroupController');

const router = express.Router();

router.get('/getExpenseGroups', expenseGroupController.getExpenseGroups);
router.post('/createExpenseGroup', expenseGroupController.createExpenseGroup);

router.post(
  '/createChildExpenseGroup',
  expenseGroupController.createChildExpenseGroup
);

module.exports = router;
