import express from 'express';
import { createReminder, sendEmailReminder, sendPushNotification, syncWithCalendar, getUserReminders, updateReminder } from '../controllers/ReminderController.js';
import {
    authenticateUser,
    authorizePermissions,
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new reminder
router.post('/reminders', authenticateUser, createReminder);

// Send email reminder
router.post('/reminders/send-email/:id', authenticateUser, sendEmailReminder);

// Send push notification
router.post('/reminders/send-push/:id', authenticateUser, sendPushNotification);

// Sync reminder with calendar
router.post('/reminders/calendar-sync/:id', authenticateUser, syncWithCalendar);

// Get all user reminders
router.get('/reminders', authenticateUser, authorizePermissions('admin'), getUserReminders);

// Update a reminder
router.patch('/reminders/:id', authenticateUser, updateReminder);

export default router;
