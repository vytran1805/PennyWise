import mongoose from 'mongoose';
// define structure of User database
const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  date: { type: mongoose.Schema.Types.Date, required: true },
});

// take the schema above and put it inside the Income model
const Income = mongoose.model('Income', incomeSchema);

export default Income;
