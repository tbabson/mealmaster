import express from 'express';
import { createReminder, sendPushNotification, savePushSubscription, syncWithCalendar, getUserReminders, updateReminder } from '../controllers/ReminderController.js';
import {
    authenticateUser,
    authorizePermissions,
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new reminder
router.post('/', authenticateUser, createReminder);

// Send email reminder
//router.post('/reminders/send-email/:id', authenticateUser, sendEmailReminder);

// Send push notification
router.post('/send-push/:id', authenticateUser, sendPushNotification);

// Send push notification
router.post('/subscribe', authenticateUser, savePushSubscription);

// Sync reminder with calendar
router.post('/calendar-sync/:id', authenticateUser, syncWithCalendar);

// Get all user reminders
router.get('/reminders', authenticateUser, authorizePermissions('admin'), getUserReminders);

// Update a reminder
router.patch('/:id', authenticateUser, updateReminder);

export default router;
