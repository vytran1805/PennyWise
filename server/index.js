"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("./models/userSchema")); // Assuming UserDocument is a Mongoose document type
const dotenv_1 = __importDefault(require("dotenv"));
/* CONFIGURATION */
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
/* CONNECT TO EXPRESS APP */
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
/* CONNECT TO MONGODB */
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is connected to port ${PORT} and connected to MongoDB`);
    });
})
    .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB');
});
/* MIDDLEWARE */
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
/* SCHEMA */
// userSchema
/* ROUTES */
// POST users
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userSchema_1.default({ email, username, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: '201 - User created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: '500 - Internal Server Error' });
    }
}));
// GET registered users
app.get('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find();
        res.status(201).json(users);
    }
    catch (error) {
        res.status(500).json({ error: '500 - Unable to get users' });
    }
}));
// GET login user
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userSchema_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: '401 - Invalid credentials' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: '401 - Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1hr',
        });
        res.json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ error: '500 - Unable to login', message: error });
    }
}));
// app.listen(PORT);
