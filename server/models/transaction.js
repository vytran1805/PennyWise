import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Name is required'] },
  type: { type: String, require: [true, 'Type is required'] },
  description: { type: String, require: false },
  amount: { type: Number, require: [true, 'Amount is required'] },
  date: { type: String, require: false },
  category: { type: String, required: [true, 'Category is required'] },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
