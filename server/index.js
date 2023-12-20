import express from "express";
import bodyParser from "body-parser"; //handle information that’s coming from the body of a request
import mongoose from "mongoose";
import cors from "cors"; //handle cross origin resource sharing requests so that we can call from different URL
import bcrypt from "bcrypt"; //Library used for securely hashing passwords, aiding in storing passwords securely by making them difficult to reverse engineer.
import jwt from "jsonwebtoken"; //Package allowing the generation and verification of JSON Web Tokens (JWTs), commonly used for authentication and secure transmission of information between parties.
/* CONFIGURATION */
const PORT = 3001 || 8080;
const dbURI =
  "mongodb+srv://vtranAdmin:Password1@cluster30.ky5qwaf.mongodb.net/PennyWiseDB?retryWrites=true&w=majority";
dotenv.config();

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

/* ROUTES */

// app.listen(PORT); //use port 3001
