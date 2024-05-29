import express from 'express';
import {
  getUserIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getIncome,
} from '../controllers/incomeController.js';

const incomeRouter = express.Router();

// incomeRouter
//   .route('/incomes')
//   .get(getUserIncomes)
//   .post(createIncome);
// incomeRouter.route('/incomes').post(logUserIn);
incomeRouter.post('/', createIncome);
incomeRouter.get('/', getUserIncomes);
incomeRouter.get('/:id', getIncome);
incomeRouter.patch('/:id', updateIncome);
incomeRouter.delete('/:id', deleteIncome);
export default incomeRouter;
