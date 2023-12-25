import express from 'express';
import {
  getAllTransactions,
  createTransaction,
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter
  .route('/transaction')
  .get(getAllTransactions)
  .post(createTransaction);
// transactionRouter.route('/login').post(logUserIn);
export default transactionRouter;
