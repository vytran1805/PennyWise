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
transactionRouter.post('/transactions', createTransaction);
transactionRouter.get('/transactions', getAllTransactions);
transactionRouter.patch('/transactions', updateTransaction);
transactionRouter.delete('/transactions', deleteTransaction);
export default transactionRouter;
