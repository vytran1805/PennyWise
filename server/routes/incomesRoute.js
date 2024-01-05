import express from 'express';
import {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../controllers/incomesController.js';

const incomesRouter = express.Router();

// incomeRouter
//   .route('/income')
//   .get(getAllIncomes)
//   .post(createIncome);
// incomeRouter.route('/income').post(logUserIn);
incomesRouter.post('/', createIncome);
incomesRouter.get('/', getAllIncomes);
incomesRouter.patch('/', updateIncome);
incomesRouter.delete('/', deleteIncome);
export default incomesRouter;
