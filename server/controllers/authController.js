import bcrypt from 'bcrypt'; //Library used for securely hashing passwords, aiding in storing passwords securely by making them difficult to reverse engineer.
import User from '../models/user.js';
import jwt from 'jsonwebtoken'; //Package allowing the generation and verification of JSON Web Tokens (JWTs), commonly used for authentication and secure transmission of information between parties.

/**
 * Creeate new user
 * @param {*} req
 * @param {*} res
 */
export const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10); //create a hashed password: 10 is no. of rounds, higher numbers increase security but also take more time to generate the hash.
    const newUser = new User({ email, username, password: hashedPasword }); //create new userSchema
    await newUser.save(); //save to the database
    res.status(201).json({ message: '201 - User created successfully' }); //return the resquest status when new user is successfully created
  } catch (error) {
    res.status(500).json({ eror: '500 - Internal Server Error' });
  }
};

/**
 * Get all users
 * @param {*} req
 * @param {*} res
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ eror: '500 - Unable to get users' });
  }
};

/**
 * Log user in
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const logUserIn = async (req, res) => {
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
};
