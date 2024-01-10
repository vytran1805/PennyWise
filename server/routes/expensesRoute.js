import express from 'express';
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expensesController.js';

const expensesRouter = express.Router();

// expenseRouter
//   .route('/expense')
//   .get(getAllExpenses)
//   .post(createExpense);
// expenseRouter.route('/expense').post(logUserIn);
expensesRouter.post('/', createExpense);
expensesRouter.get('/', getAllExpenses);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', deleteExpense);
export default expensesRouter;
