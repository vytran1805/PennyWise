import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

// take the schema above and put it inside the variable
const User = mongoose.model("User");
