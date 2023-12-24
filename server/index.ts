import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/userSchema'; // Assuming UserDocument is a Mongoose document type
import dotenv from 'dotenv';

/* CONFIGURATION */
dotenv.config();
const PORT: number | string = process.env.PORT || 8080;

/* CONNECT TO EXPRESS APP */
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* CONNECT TO MONGODB */
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is connected to port ${PORT} and connected to MongoDB`
      );
    });
  })
  .catch((error: any) => {
    console.log('Unable to connect to Server and/or MongoDB');
  });

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());

/* SCHEMA */
// userSchema

/* ROUTES */
// POST users
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: '201 - User created successfully' });
  } catch (error: any) {
    res.status(500).json({ error: '500 - Internal Server Error' });
  }
});

// GET registered users
app.get('/register', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error: any) {
    res.status(500).json({ error: '500 - Unable to get users' });
  }
});

// GET login user
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: '401 - Invalid credentials' });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: '401 - Invalid password' });
    }

    const token: string = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '1hr',
      }
    );

    res.json({ message: 'Login successful' });
  } catch (error: any) {
    res.status(500).json({ error: '500 - Unable to login', message: error });
  }
});

// app.listen(PORT);
