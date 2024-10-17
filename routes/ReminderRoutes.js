import express from 'express';
import { createReminder, sendEmailReminder, syncWithCalendar, getUserReminders, updateReminder } from '../controllers/ReminderController.js';

const router = express.Router();

// Create a new reminder
router.post('/reminders', createReminder);

// Send email reminder
router.post('/reminders/send-email/:id', sendEmailReminder);

// Sync reminder with calendar
router.post('/reminders/calendar-sync/:id', syncWithCalendar);

// Get all user reminders
router.get('/reminders', getUserReminders);

// Update a reminder
router.put('/reminders/:id', updateReminder);

export default router;
