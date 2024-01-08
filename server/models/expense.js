import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Name is required'] },
  description: { type: String, require: false },
  amount: { type: Number, require: [true, 'Amount is required'] },
  date: { type: Date, require: false },
  category: { type: String, required: [true, 'Category is required'] },
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
