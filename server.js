//PACKAGE IMPORTS
import * as dotenv from 'dotenv';

import express from 'express';
const app = express();
import 'express-async-errors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import { initializeReminderSystem } from './controllers/ScheduleReminders.js'
import cors from 'cors'


//import { authenticateGoogleAPI } from './controllers/ScheduleReminders.js';

//CUSTOM IMPORTS
//routers
import authRouter from './routes/authRoutes.js';
import mealRouter from './routes/MealRoutes.js';
import ingredientRouter from './routes/ingredientRoutes.js';
import preparationRouter from './routes/prepStepRoutes.js';
import shoppingListsRouter from './routes/shoppingListRoutes.js';
import ordersRouter from './routes/OrderRoutes.js';
import reminderRoutes from './routes/ReminderRoutes.js';
import reviewRoutes from './routes/ReviewRoutes.js';
import userRoutes from './routes/UserRoutes.js';

//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

initializeReminderSystem(); // Start the reminder scheduler
//authenticateGoogleAPI()

app.use(cors())
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('hello world');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/preparationSteps', preparationRouter);
app.use('/api/v1/shoppingLists', shoppingListsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/reminders', reminderRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/users', userRoutes);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, '0.0.0.0', () => {
    console.log(`server running on PORT ${port}...`);

  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
