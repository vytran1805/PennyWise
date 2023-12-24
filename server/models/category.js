import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: false },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      required: false,
    },
  ],
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
