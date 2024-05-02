import express from 'express';
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
} from '../controllers/expenseController.js';

const expensesRouter = express.Router();

// expenseRouter
//   .route('/expense')
//   .get(getAllExpenses)
//   .post(createExpense);
// expenseRouter.route('/expense').post(logUserIn);
expensesRouter.post('/', createExpense);
expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', getExpense);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);
export default expensesRouter;
