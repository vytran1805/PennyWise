import express from 'express';
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getIncome,
} from '../controllers/incomesController.js';

const incomesRouter = express.Router();

// incomeRouter
//   .route('/incomes')
//   .get(getAllIncomes)
//   .post(createIncome);
// incomeRouter.route('/incomes').post(logUserIn);
incomesRouter.post('/', createIncome);
incomesRouter.get('/', getAllIncomes);
incomesRouter.get('/:id', getIncome);
incomesRouter.patch('/:id', updateIncome);
incomesRouter.delete('/:id', deleteIncome);
export default incomesRouter;
