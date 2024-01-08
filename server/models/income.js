import mongoose from 'mongoose';
// define structure of User database
const incomeSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Name is required'] },
  description: { type: String, require: false },
  amount: { type: Number, require: [true, 'Amount is required'] },
  date: { type: Date, require: false },
  category: { type: String, required: [true, 'Category is required'] },
});

// take the schema above and put it inside the Income model
const Income = mongoose.model('Income', incomeSchema);

export default Income;
