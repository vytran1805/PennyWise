import express from 'express';
import bodyParser from 'body-parser'; //handle information that’s coming from the body of a request
import mongoose from 'mongoose';
import cors from 'cors'; //handle cross origin resource sharing requests so that we can call from different URL
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import { AUTH, EXPENSE, INCOME, CATEGORY } from './routes/routePaths.js'; // Import route paths

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
  .then(async () => {
    app.listen(PORT, () => {
      console.log(
        `Server is connected to port ${PORT} and connected to MongoDB`
      );
    });
    // await mongoose.connection.db.dropDatabase();
  })
  .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB');
  });

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());

/* SCHEMA */
// userSchema
// app.post('/login', logUserIn);

/* ROUTES */
// Authentication
app.use(AUTH, authRouter);
app.use(EXPENSE, expenseRouter);
app.use(INCOME, incomeRouter);
app.use(CATEGORY, categoryRouter);
// app.post('/register', createUser);
// GET registered users
// app.get('/register', getUsers);

// GET login user
// Endpoint for user login

// app.listen(PORT); //use port 3001
