import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: false },
  amount: { type: Number, require: true },
  date: { type: mongoose.Schema.Types.Date, require: false },
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
  category: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
