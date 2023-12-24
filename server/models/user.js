import mongoose from 'mongoose';
// define structure of User database
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Income',
      required: false,
    },
  ],
  transaction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      required: false,
    },
  ],
});

// take the schema above and put it inside the User model
const User = mongoose.model('User', userSchema);

export default User;
