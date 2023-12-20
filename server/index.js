import express from "express";
import bodyParser from "body-parser"; //handle information that’s coming from the body of a request
import mongoose from "mongoose";
import cors from "cors"; //handle cross origin resource sharing requests so that we can call from different URL
import bcrypt from "bcrypt"; //Library used for securely hashing passwords, aiding in storing passwords securely by making them difficult to reverse engineer.
import jwt from "jsonwebtoken"; //Package allowing the generation and verification of JSON Web Tokens (JWTs), commonly used for authentication and secure transmission of information between parties.
/* CONFIGURATION */

// Connect to express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect to MongoDB
const dbURI =
  "mongodb+srv://vtranAdmin:Password1@cluster30.ky5qwaf.mongodb.net/?retryWrites=true&w=majority";
// middleware

// SCHEMA

// Routes

app.listen(3001); //use port 3001
