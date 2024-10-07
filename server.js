//PACKAGE IMPORTS
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
//import { v2 as cloudinary } from 'cloudinary';

//CUSTOM IMPORTS
//routers
import authRouter from './routes/authRoutes.js'
import mealRouter from './routes/MealRoutes.js'


//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/meals', mealRouter)

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
