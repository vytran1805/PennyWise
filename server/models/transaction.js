import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Name is required'] },
  description: { type: String, require: false },
  amount: { type: Number, require: [true, 'Amount is required'] },
  date: { type: mongoose.Schema.Types.Date, require: false },
  category: { type: String, required: [true, 'Category is required'] },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
