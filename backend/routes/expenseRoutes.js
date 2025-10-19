const express = require('express');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseSummary
} = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Expense routes
router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/summary')
  .get(getExpenseSummary);

router.route('/:id')
  .get(getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
