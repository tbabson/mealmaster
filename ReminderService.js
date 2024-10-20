import cron from 'node-cron';
import MealSchedule from './models/MealScheduleModel.js';
import nodemailer from 'nodemailer';

// Cron job to check for upcoming reminders every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const currentTime = new Date();
  const upcomingReminders = await MealSchedule.find({
    reminderTime: { $lte: currentTime },
    reminderSent: false,
  });

  // Send reminder emails for upcoming meals
  for (const reminder of upcomingReminders) {
    sendReminderEmail(reminder);
    reminder.reminderSent = true; // Mark reminder as sent
    await reminder.save();
  }
});

// Function to send email reminders
const sendReminderEmail = async (reminder) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reminder.user.email,
    subject: `Meal Reminder: ${reminder.meal.name}`,
    text: `You have a scheduled meal: ${reminder.meal.name} at ${reminder.scheduledTime}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent!');
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
};
