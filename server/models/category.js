import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: false },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
      required: false,
    },
  ],
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income',
    required: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
