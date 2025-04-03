/////NEW CODE//////


import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();
import schedule from 'node-schedule';
import Reminder from '../models/ReminderModel.js';
import { transporter } from '../utils/transporter.js';
import moment from 'moment-timezone';
import { google } from 'googleapis';
import fs from 'fs';
import readline from 'readline'

// Load client secrets from a local file
//const CREDENTIALS_PATH = '../utils/credentials.json'; // Path to Google API credentials file
//const TOKEN_PATH = '../utils/token.json'; // Path where OAuth tokens will be saved

// Set up OAuth2 client
const authClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Load tokens if they exist
const loadSavedToken = () => {
  try {
    const token = fs.readFileSync(TOKEN_PATH, 'utf-8');
    authClient.setCredentials(JSON.parse(token));
  } catch (err) {
    console.error('Error loading token:', err);
  }
};

// Save new tokens to disk
const saveToken = (token) => {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to', TOKEN_PATH);
};

// Function to authenticate with Google Calendar API
export const authenticateGoogleAPI = async () => {
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  // Prompt for auth code
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the authorization code from that page here: ', async (authCode) => {
    rl.close();

    // Exchange the authorization code for an access token
    const { tokens } = await authClient.getToken(authCode);
    authClient.setCredentials(tokens);
    saveToken(tokens);  // Save token for later use
    console.log('Successfully authenticated and saved tokens!');
  });
};

// Function to send email reminder
// Function to send email reminder
// Function to send email reminder
const sendEmailReminder = async (reminderId) => {
  try {
    // Find the reminder and populate meal and user details.
    const reminder = await Reminder.findById(reminderId)
      .populate({
        path: 'meal',
        select: 'name image ingredients preparationSteps',
        populate: [
          { path: 'ingredients', select: 'name' },
          // This line is crucial - it populates the preparationSteps references
          {
            path: 'preparationSteps',
            select: 'description skillLevel steps',
            populate: {
              path: 'steps',
              select: 'stepNumber instruction duration _id'
            }
          }
        ]
      })
      .populate('user', 'email fullName');

    if (!reminder) {
      console.error(`Reminder with ID ${reminderId} not found.`);
      return false;
    }

    // Extract meal and user details
    const { meal, user, reminderTime } = reminder;
    const ingredientNames = meal.ingredients.map(({ name }) => name).join(', ');

    // Check if preparationSteps array exists and has elements
    const formattedPreparationSteps =
      meal.preparationSteps &&
        Array.isArray(meal.preparationSteps) &&
        meal.preparationSteps.length > 0 &&
        meal.preparationSteps[0].steps &&
        meal.preparationSteps[0].steps.length > 0
        ? meal.preparationSteps[0].steps.map(({ _id, stepNumber, instruction, duration }) =>
          `Step ${stepNumber} (ID: ${_id}): ${instruction} (Duration: ${duration || 'N/A'})`
        ).join('\n')
        : 'No preparation steps provided.';

    // Configure email content with both text and HTML versions
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Meal Reminder: ${meal.name}`,
      text: `Hello ${user.fullName},\n\nJust a reminder to prepare your meal: ${meal.name}\n\nMeal Details:\n- Image: ${meal.image || 'N/A'}\n- Ingredients: ${ingredientNames}\n\nPreparation Steps:\n${formattedPreparationSteps}\n\nScheduled Time: ${new Date(reminderTime).toLocaleString()}\n\nEnjoy your meal!`,
      html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Meal Reminder: ${meal.name}</h1>
        
        <p>Hello ${user.fullName},</p>
        
        <p>Just a reminder to prepare your delicious meal.</p>
        
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
          <h2 style="color: #2c3e50;">Meal Details</h2>
          
          ${meal.image ? `
          <div style="text-align: center; margin-bottom: 15px;">
            <img src="${meal.image}" alt="${meal.name}" style="max-width: 300px; border-radius: 10px;">
          </div>` : ''}
          
          <h3 style="color: #34495e;">Ingredients</h3>
          <ul style="list-style-type: disc; padding-left: 20px;">
            ${meal.ingredients.map(({ name }) => `<li>${name}</li>`).join('')}
          </ul>
          
          <h3 style="color: #34495e;">Preparation Steps</h3>
          <ol style="padding-left: 20px; list-style: none;">
            ${meal.preparationSteps &&
          Array.isArray(meal.preparationSteps) &&
          meal.preparationSteps.length > 0 &&
          meal.preparationSteps[0].steps &&
          meal.preparationSteps[0].steps.length > 0
          ? meal.preparationSteps[0].steps.map(({ _id, stepNumber, instruction, duration }) => `
                <li>
                  <strong>Step ${stepNumber} </strong>: ${instruction}
                  <span style="color: #7f8c8d; font-style: italic; margin-left: 10px;">(Duration: ${duration || 'N/A'})</span>
                </li>
              `).join('')
          : '<li>No preparation steps provided.</li>'}
          </ol>
        </div>
        
        <p style="margin-top: 15px;">
          <strong>Scheduled Time:</strong> ${new Date(reminderTime).toLocaleString()}
        </p>
        
        <p style="color: #7f8c8d; font-style: italic;">Enjoy your meal!</p>
      </body>
      </html>`
    };

    // Send the email (assuming you have a transporter set up)
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email reminder:', error);
    return false;
  }
};


// Function to sync with calendar
const syncWithCalendar = async (reminder) => {
  try {
    // Your calendar sync logic here
    // Authenticate or use saved token
    loadSavedToken();

    const calendar = google.calendar({ version: 'v3', auth: authClient });

    // Calendar event details
    const event = {
      summary: `Meal Reminder: ${reminder.meal.name}`,
      description: `It's time to prepare your meal: ${reminder.meal.name}`,
      start: {
        dateTime: reminder.reminderTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(reminder.reminderTime).getTime() + 60 * 60 * 1000).toISOString(), // 1-hour duration
        timeZone: 'UTC',
      },
    };

    // Insert the event into the calendar
    const calendarEvent = await calendar.events.insert({
      calendarId: 'primary', // Main user calendar
      resource: event,
    });

    console.log(`Calendar synced for reminder ${reminder._id}: Event ID: ${calendarEvent.data.id}`);
    return true;

    // console.log(`Calendar synced for reminder ${reminder._id}`);
    // return true;
  } catch (error) {
    //console.error('Error syncing with calendar:', error);
    return false;
  }
};

// Function to calculate next reminder time
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
    default:
      return null;
  }

  return nextTime;
};

// Function to process a single reminder
const processReminder = async (reminder) => {
  let notificationSent = false;

  // Send notification based on method
  switch (reminder.notificationMethod) {
    case 'email':
      notificationSent = await sendEmailReminder(reminder);
      break;
    case 'push':
      notificationSent = await sendPushNotification(reminder);
      break;
    case 'calendar':
      notificationSent = await syncWithCalendar(reminder);
      break;
    default:
      console.log(`Unknown notification method: ${reminder.notificationMethod}`);
      return false;
  }

  if (notificationSent) {
    // Handle recurring reminders
    if (reminder.isRecurring && reminder.recurringFrequency) {
      const nextReminderTime = getNextReminderTime(
        reminder.reminderTime,
        reminder.recurringFrequency
      );

      if (nextReminderTime) {
        reminder.reminderTime = nextReminderTime;
        reminder.notified = false; // Reset for next occurrence
      } else {
        reminder.isRecurring = false;
        reminder.notified = true;
      }
    } else {
      reminder.notified = true;
    }

    await reminder.save();
    return true;
  }

  return false;
};

// Main scheduler function
export const scheduleReminders = () => {
  // Run every minute
  schedule.scheduleJob("*/1 * * * *", async () => {
    const now = moment().utc().toDate(); // Get current time in UTC

    try {
      // Find all due reminders within the next minute that haven't been notified
      const dueReminders = await Reminder.find({
        reminderTime: { $lte: now },
        notified: false,
      }).populate([
        { path: "user", select: "email fullName" },
        { path: "meal", select: "name" },
      ]);

      if (dueReminders.length === 0) return;

      // Process each due reminder
      for (const reminder of dueReminders) {
        await processReminder(reminder);
      }
    } catch (error) {
      console.error("Error processing reminders:", error);
    }
  });
};

// Start the reminder scheduler
export const initializeReminderSystem = () => {
  try {
    console.log('Initializing reminder system...');
    scheduleReminders();
  } catch (error) {
    console.error("Error initializing reminder system:", error.message);
  }
};

