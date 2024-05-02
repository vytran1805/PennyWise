import mongoose from 'mongoose';
// define structure of User database
const incomeSchema = new mongoose.Schema({
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
        return this.type === 'Income';
      },
      message: 'Income category must be of type Income',
    },
  },
  type: { type: String, default: 'Income' },
});

// take the schema above and put it inside the Income model
const Income = mongoose.model('Income', incomeSchema);

export default Income;
