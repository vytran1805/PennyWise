import express from 'express';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();

// transactionRouter
//   .route('/transaction')
//   .get(getAllTransactions)
//   .post(createTransaction);
// transactionRouter.route('/transaction').post(logUserIn);
transactionRouter.post('/', createTransaction);
transactionRouter.get('/', getAllTransactions);
transactionRouter.patch('/', updateTransaction);
transactionRouter.delete('/', deleteTransaction);
export default transactionRouter;
