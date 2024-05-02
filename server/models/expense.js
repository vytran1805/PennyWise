import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, require: [true, 'Name is required'] },
  description: { type: String, require: false },
  amount: { type: Number, require: [true, 'Amount is required'] },
  date: { type: Date, require: false },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
    validate: {
      validator: function (value) {
        return this.type === 'Expense';
      },
      message: 'Expense category must be of type Expense',
    },
  },
  type: { type: String, default: 'Expenses' },
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
