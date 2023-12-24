"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// define structure of User database
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// take the schema above and put it inside the User model
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
