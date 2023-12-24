import mongoose from "mongoose";
// define structure of User database
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// take the schema above and put it inside the User model
const User = mongoose.model("User", userSchema);

export default User;
