import cron from 'node-cron';
import Reminder from '../models/ReminderModel.js';
import {
  sendEmailReminder,
  sendPushNotification,
  syncWithCalendar,
} from './ReminderController.js';
import { StatusCodes } from 'http-status-codes';

// Function to calculate the next reminder time based on frequency
const getNextReminderTime = (currentReminderTime, frequency) => {
  const nextTime = new Date(currentReminderTime);

  switch (frequency) {
    case 'daily':
      nextTime.setDate(nextTime.getDate() + 1);
      break;
    case 'weekly':
      nextTime.setDate(nextTime.getDate() + 7);
      break;
    case 'monthly':
      nextTime.setMonth(nextTime.getMonth() + 1);
      break;
    // Add more cases for other frequencies if needed
    default:
      return null; // For non-recurring reminders
  }

  return nextTime;
};

// Function to check for reminders that are due and trigger notifications
export const scheduleReminders = () => {
  // Run every minute to check for upcoming reminders
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      // Find reminders that are due for notification and haven't been notified yet
      const dueReminders = await Reminder.find({
        reminderTime: { $lte: now },
        notified: false, // Track notifications
      }).populate(['user', 'meal']);

      // Process each due reminder
      for (const reminder of dueReminders) {
        // Send the appropriate notification
        if (reminder.notificationMethod === 'email') {
          await sendEmailReminder(
            { params: { id: reminder._id } },
            { status: () => ({ json: () => {} }) }
          );
        } else if (reminder.notificationMethod === 'push') {
          await sendPushNotification(
            { params: { id: reminder._id } },
            { status: () => ({ json: () => {} }) }
          );
        } else if (reminder.notificationMethod === 'calendar') {
          await syncWithCalendar(
            { params: { id: reminder._id } },
            { status: () => ({ json: () => {} }) }
          );
        }

        // If recurring, update the reminderTime to the next occurrence
        if (reminder.isRecurring && reminder.recurringFrequency) {
          const nextReminderTime = getNextReminderTime(
            reminder.reminderTime,
            reminder.recurringFrequency
          );
          if (nextReminderTime) {
            reminder.reminderTime = nextReminderTime;
          } else {
            reminder.isRecurring = false; // Stop recurring if frequency is not recognized
          }
        } else {
          // If non-recurring, mark as notified
          reminder.notified = true;
        }

        // Save the updated reminder
        await reminder.save();
      }
    } catch (error) {
      console.error('Error processing reminders:', error);
    }
  });
};
