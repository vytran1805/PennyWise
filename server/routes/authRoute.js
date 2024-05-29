import express from 'express';
import {
  createUser,
  getUsers,
  logUserIn,
  deleteUser,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/register').get(getUsers).post(createUser);
authRouter.route('/register/:id').delete(deleteUser);
authRouter.route('/login').post(logUserIn);
export default authRouter;
