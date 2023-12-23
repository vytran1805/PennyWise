import express from 'express';
import bodyParser from 'body-parser'; //handle information that’s coming from the body of a request
import mongoose from 'mongoose';
import cors from 'cors'; //handle cross origin resource sharing requests so that we can call from different URL
import bcrypt from 'bcrypt'; //Library used for securely hashing passwords, aiding in storing passwords securely by making them difficult to reverse engineer.
import jwt from 'jsonwebtoken'; //Package allowing the generation and verification of JSON Web Tokens (JWTs), commonly used for authentication and secure transmission of information between parties.
import User from './models/userSchema.js';
import dotenv from 'dotenv';
/* CONFIGURATION */
dotenv.config();
const PORT = process.env.PORT || 8080;

/* CONNECT TO EXPRESS APP */
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* CONNECT TO MONGODB */
// NOTE: useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
// Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false
// See: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is connected to port ${PORT} and connected to MongoDB`
      );
    });
  })
  .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB');
  });

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());

/* SCHEMA */
// userSchema

/* ROUTES */
// POST users
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10); //create a hashed password: 10 is no. of rounds, higher numbers increase security but also take more time to generate the hash.
    const newUser = new User({ email, username, password: hashedPasword }); //create new userSchema
    await newUser.save(); //save to the database
    res.status(201).json({ message: '201 - User created successfully' }); //return the resquest status when new user is successfully created
  } catch (error) {
    res.status(500).json({ eror: '500 - Internal Server Error' });
  }
});
// GET registered users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ eror: '500 - Unable to get users' });
  }
});

// GET login user
// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body
    const user = await User.findOne({ username }); // Find user in the database based on the provided username

    if (!user) {
      return res.status(401).json({ error: '401 - Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // verify provided password against the user's stored hashed password

    if (!isPasswordValid) {
      // If password is invalid, return error for invalid password
      return res.status(401).json({ error: '401 - Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      // Generate a JWT token with user ID payload for successful login, session expires in 1hr
      expiresIn: '1hr',
    });

    res.json({ message: 'Login successful' });
    // res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to login', message: error });
  }
});

// app.listen(PORT); //use port 3001
