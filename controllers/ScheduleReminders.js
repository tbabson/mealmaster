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
    // Note: If the steps are embedded (not references) you don't need to populate them,
    // but if they're referenced, uncomment the nested populate below.
    const reminder = await Reminder.findById(reminderId)
      .populate({
        path: 'meal',
        select: 'name image ingredients preparationSteps', // Fetch necessary fields
        populate: [
          { path: 'ingredients', select: 'name' },
          // Uncomment the next line if 'steps' inside 'preparationSteps' are references
          // { path: 'preparationSteps.steps', select: 'stepNumber instruction duration' }
        ]
      })
      .populate('user', 'email fullName'); // Populate user email and full name

    if (!reminder) {
      console.error(`Reminder with ID ${reminderId} not found.`);
      return false;
    }

    // Extract meal and user details.
    const { meal, user, reminderTime } = reminder;
    const ingredientNames = meal.ingredients.map(({ name }) => name).join(', ');

    // Check if preparationSteps object and its nested steps array exist and format them.
    const formattedPreparationSteps =
      meal.preparationSteps &&
        meal.preparationSteps.steps &&
        meal.preparationSteps.steps.length > 0
        ? meal.preparationSteps.steps.map(({ _id, stepNumber, instruction, duration }) =>
          `Step ${stepNumber} (ID: ${_id}): ${instruction} (Duration: ${duration})`
        ).join('\n')
        : 'No preparation steps provided.';

    // Configure email content with both text and HTML versions.
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Meal Reminder: ${meal.name}`,
      text: `Hello ${user.fullName},

Just a reminder to prepare your meal: ${meal.name}

Meal Details:
- Image: ${meal.image}
- Ingredients: ${ingredientNames}

Preparation Steps:
${formattedPreparationSteps}

Scheduled Time: ${new Date(reminderTime).toLocaleString()}

Enjoy your meal!`,
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
          <ol style="padding-left: 20px;">
            ${meal.preparationSteps &&
          meal.preparationSteps.steps &&
          meal.preparationSteps.steps.length > 0
          ? meal.preparationSteps.steps.map(({ _id, stepNumber, instruction, duration }) => `
              <li>
                <strong>Step ${stepNumber} (ID: ${_id})</strong>: ${instruction}
                <span style="color: #7f8c8d; font-style: italic; margin-left: 10px;">(Duration: ${duration})</span>
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

    // Send email.
    await transporter.sendMail(mailOptions);
    console.log(`Email sent for reminder`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
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
  schedule.scheduleJob('* * * * *', async () => {
    const now = moment().tz('Africa/Lagos').toDate();
    //console.log('Cron job triggered at', now);
    try {
      // Find all due reminders within the next minute that haven't been notified
      const dueReminders = await Reminder.find({
        reminderTime: {
          $lte: new Date(new Date().getTime() + 120000) // 1-minute buffer
        },
        notified: false
      }).populate([
        { path: 'user', select: 'email fullName' },
        { path: 'meal', select: 'name' }
      ]);

      // Process each due reminder
      for (const reminder of dueReminders) {
        await processReminder(reminder);
      }
    } catch (error) {
      console.error('Error processing reminders:', error);
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

