import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  type: { type: String, enum: ['Income', 'Expense'], required: true }, // New field to distinguish between income and expense categories
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
