import express from 'express';
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getIncome,
} from '../controllers/incomeController.js';

const incomeRouter = express.Router();

// incomeRouter
//   .route('/incomes')
//   .get(getAllIncomes)
//   .post(createIncome);
// incomeRouter.route('/incomes').post(logUserIn);
incomeRouter.post('/', createIncome);
incomeRouter.get('/', getAllIncomes);
incomeRouter.get('/:id', getIncome);
incomeRouter.patch('/:id', updateIncome);
incomeRouter.delete('/:id', deleteIncome);
export default incomeRouter;
