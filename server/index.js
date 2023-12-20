import express from "express";
import bodyParser from "body-parser"; //handle information that’s coming from the body of a request
import mongoose from "mongoose";
import cors from "cors"; //handle cross origin resource sharing requests so that we can call from different URL
import bcrypt from "bcrypt"; //Library used for securely hashing passwords, aiding in storing passwords securely by making them difficult to reverse engineer.
import jwt from "jsonwebtoken"; //Package allowing the generation and verification of JSON Web Tokens (JWTs), commonly used for authentication and secure transmission of information between parties.
import User from "./models/userSchema.js";
/* CONFIGURATION */
const PORT = 3001 || 8080;
const dbURI =
  "mongodb+srv://vtranAdmin:Password1@cluster30.ky5qwaf.mongodb.net/PennyWiseDB?retryWrites=true&w=majority";

/* CONNECT TO EXPRESS APP */
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* CONNECT TO MONGODB */
// NOTE: useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
// Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false
// See: https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is connected to port ${PORT} and connected to MongoDB`
      );
    });
  })
  .catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB");
  });

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());

/* SCHEMA */
// userSchema

/* ROUTES */
// POST
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPasword = await bcrypt.hash(password, 10); //create a hashed password: 10 is no. of rounds, higher numbers increase security but also take more time to generate the hash.
    const newUser = new User({ email, username, password: hashedPasword }); //create new userSchema
    await newUser.save(); //save to the database
    res.status(201).json({ message: "201 - User created successfully" }); //return the resquest status when new user is successfully created
  } catch (error) {
    res.status(500).json({ eror: "500 - Internal Server Error" });
  }
});
// GET
app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ eror: "500 - Unable to get users" });
  }
});
// app.listen(PORT); //use port 3001
