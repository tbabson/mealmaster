import express from 'express';
import {
  scheduleMeal,
  getMealSchedules,
  updateMealSchedule,
  deleteMealSchedule,
  getUpcomingReminders,
} from '../controllers/MealScheduleController.js';

const router = express.Router();

// Routes
router.post('/meals/schedule', scheduleMeal); // Schedule a new meal
router.get('/meals/schedules/:userId', getMealSchedules); // Get all meal schedules for a user
router.put('/meals/schedules/:id', updateMealSchedule); // Update a meal schedule
router.delete('/meals/schedules/:id', deleteMealSchedule); // Delete a meal schedule
router.get('/meals/reminders/:userId', getUpcomingReminders); // Get upcoming meal reminders

export default router;
