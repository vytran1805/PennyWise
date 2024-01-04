import mongoose from 'mongoose';
// define structure of User database
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required and should be unique'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Name is required and should be unique'],
    unique: true,
  },
  password: { type: String, required: [true, 'Passwordis required'] },
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Income',
      required: false,
    },
  ],
  expense: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
      required: false,
    },
  ],
});

// take the schema above and put it inside the User model
const User = mongoose.model('User', userSchema);

export default User;
