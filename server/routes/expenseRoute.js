import express from 'express';
import {
  getUserExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
} from '../controllers/expenseController.js';

const expensesRouter = express.Router();

// expenseRouter
//   .route('/expense')
//   .get(getUserExpenses)
//   .post(createExpense);
// expenseRouter.route('/expense').post(logUserIn);
expensesRouter.post('/', createExpense);
expensesRouter.get('/', getUserExpenses);
expensesRouter.get('/:id', getExpense);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);
export default expensesRouter;
