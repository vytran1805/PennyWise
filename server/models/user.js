import mongoose from 'mongoose';
// define structure of User database
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email should be unique'],
  },
  username: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name should be unique'],
  },
  password: { type: String, required: [true, 'Password is required'] },
});

// take the schema above and put it inside the User model
const User = mongoose.model('User', userSchema);

export default User;
