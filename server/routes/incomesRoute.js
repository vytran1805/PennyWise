import express from 'express';
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../controllers/incomesController.js';

const incomesRouter = express.Router();

// incomeRouter
//   .route('/incomes')
//   .get(getAllIncomes)
//   .post(createIncome);
// incomeRouter.route('/incomes').post(logUserIn);
incomesRouter.post('/', createIncome);
incomesRouter.get('/', getAllIncomes);
incomesRouter.patch('/', updateIncome);
incomesRouter.delete('/', deleteIncome);
export default incomesRouter;
