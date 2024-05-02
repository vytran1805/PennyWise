import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} from '../controllers/categoryController.js';

const categoriesRouter = express.Router();

// categoryRouter
//   .route('/categories')
//   .get(getAllCategories)
//   .post(createCategory);
// categoryRouter.route('/categories').post(logUserIn);
categoriesRouter.post('/', createCategory);
categoriesRouter.get('/', getAllCategories);
categoriesRouter.get('/:id', getCategory);
categoriesRouter.patch('/:id', updateCategory);
categoriesRouter.delete('/:id', deleteCategory);
export default categoriesRouter;
