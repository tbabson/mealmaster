import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Reminder";
import {
  createReminder,
  syncWithCalendar,
} from "../Features/Reminder/reminderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import PushNotificationButton from "../components/PushNotificationButton";
import customFetch from "../utils/customFetch";

const createReminders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get meal from location state
  const mealData = location.state?.meal?.meal || location.state?.meal || {};
  const [meal, setMeal] = useState(mealData);

  // Instead of one datetime-local input, we use three:
  const [reminderDate, setReminderDate] = useState(""); // e.g. "2025-04-10"
  const [reminderTime, setReminderTime] = useState(""); // e.g. "02:16"
  const [period, setPeriod] = useState("PM"); // AM or PM; default set to PM

  const [notificationMethod, setNotificationMethod] = useState("email");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("");
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false);
  const [isGoogleAuthRequired, setIsGoogleAuthRequired] = useState(false);
  const [isCalendarAuthorized, setIsCalendarAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [note, setNote] = useState("");

  // Get loading, error, and pushSubscription states from Redux
  const { isLoading, error, pushSubscription } = useSelector(
    (state) => state.reminders
  );

  useEffect(() => {
    // Handle initial meal data
    if (!mealData || Object.keys(mealData).length === 0) {
      // Try to recover meal data from localStorage if coming back from auth
      const searchParams = new URLSearchParams(location.search);
      const authStatus = searchParams.get("calendar_auth");
      const storedMeal = localStorage.getItem("pendingReminderMeal");

      if (authStatus && storedMeal) {
        setMeal(JSON.parse(storedMeal));
        // Clean up stored meal after retrieving
        localStorage.removeItem("pendingReminderMeal");
      } else {
        navigate("/meals");
      }
    }
  }, [mealData, navigate, location.search]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create reminder");
    }
  }, [error]);

  useEffect(() => {
    // Check calendar auth status when component mounts
    const checkCalendarAuth = async () => {
      try {
        const response = await customFetch.get("/users/current-user");
        setIsCalendarAuthorized(response.data.user.googleCalendarSyncEnabled);
      } catch (error) {
        console.error("Failed to check calendar auth status:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkCalendarAuth();

    // Handle callback from Google OAuth with improved error handling
    const searchParams = new URLSearchParams(location.search);
    const authStatus = searchParams.get("calendar_auth");
    const error = searchParams.get("error");

    if (authStatus === "success") {
      setIsCalendarAuthorized(true);
      toast.success("Successfully connected to Google Calendar");
    } else if (authStatus === "failed") {
      toast.error(error || "Failed to connect to Google Calendar");
    }
  }, [location]);

  // Handle Google Calendar authorization
  const handleGoogleAuth = async () => {
    try {
      // Store current meal data in localStorage before redirecting
      localStorage.setItem("pendingReminderMeal", JSON.stringify(meal));
      window.location.href = `${
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      }/api/v1/auth/google`;
    } catch (error) {
      toast.error("Failed to authenticate with Google Calendar");
    }
  };

  // Handle Google Calendar revocation
  const handleRevokeAccess = async () => {
    try {
      await customFetch.post("/api/auth/google/revoke");
      setIsCalendarAuthorized(false);
      toast.success("Google Calendar access revoked");
    } catch (error) {
      toast.error("Failed to revoke Google Calendar access");
    }
  };

  const handleNotificationMethodChange = (e) => {
    const method = e.target.value;
    setNotificationMethod(method);
    if (method === "push") {
      setPushNotificationEnabled(true);
      setIsGoogleAuthRequired(false);
    } else if (method === "calendar") {
      setPushNotificationEnabled(false);
      setIsGoogleAuthRequired(!isCalendarAuthorized);
    } else {
      setPushNotificationEnabled(false);
      setIsGoogleAuthRequired(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reminderDate || !reminderTime || !period) {
      toast.error("Please select a valid reminder date, time, and period");
      return;
    }

    // Combine the three inputs into one string that looks like: "YYYY-MM-DD hh:mm AM/PM"
    const combinedReminderTime = `${reminderDate} ${reminderTime} ${period}`;

    // Convert the combined reminder time to 24-hour format before UTC conversion
    const formattedTime = moment(combinedReminderTime, "YYYY-MM-DD hh:mm A");

    // Convert the time to UTC
    const utcReminderTime = formattedTime.utc().toISOString();

    // Only include subscription data if push notification is selected
    const subscriptionData =
      notificationMethod === "push" && pushSubscription
        ? {
            endpoint: pushSubscription.endpoint,
            keys: {
              p256dh: pushSubscription.keys.p256dh,
              auth: pushSubscription.keys.auth,
            },
          }
        : null;

    // Basic reminder data
    const reminderData = {
      meal: meal._id,
      reminderTime: utcReminderTime,
      notificationMethod,
      isRecurring,
      note, // Add note to reminder data
      ...(isRecurring && { recurringFrequency }),
    };

    // Add subscription data only for push notifications
    if (notificationMethod === "push" && subscriptionData) {
      reminderData.subscription = subscriptionData;
    }

    // Validate based on notification method
    if (notificationMethod === "push" && !subscriptionData) {
      toast.error("Please enable push notifications first");
      return;
    }

    if (notificationMethod === "calendar" && !isCalendarAuthorized) {
      toast.error("Please connect your Google Calendar first");
      return;
    }

    dispatch(createReminder(reminderData))
      .unwrap()
      .then((response) => {
        toast.success("Reminder created successfully");
        // If calendar notification is selected, sync with Google Calendar
        if (notificationMethod === "calendar") {
          dispatch(syncWithCalendar(response.reminder._id))
            .unwrap()
            .then(() => {
              toast.success("Reminder synced with Google Calendar");
            })
            .catch((error) => {
              toast.error("Failed to sync with Google Calendar");
            });
        }
        navigate("/reminders");
      })
      .catch((error) => {
        console.error("Reminder creation failed", error);
        toast.error(error.message || "Failed to create reminder");
      });
  };

  // Destructure meal details
  const { _id, name, image, ingredients = [], preparationSteps = [] } = meal;

  // Convert the reminder time from UTC to local time for display purposes
  const displayReminderTime =
    reminderDate && reminderTime && period
      ? moment(
          `${reminderDate} ${reminderTime} ${period}`,
          "YYYY-MM-DD hh:mm A"
        )
          .local() // Convert to local time
          .format("YYYY-MM-DD hh:mm A") // Format in local time
      : "";

  return (
    <Wrapper>
      <div className="reminderContainer">
        <div className="reminderForm">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Reminder Date</label>
              <input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Reminder Time</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                required
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="form-group">
              <label>Add Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note about this reminder..."
                rows="3"
                maxLength="500"
                className="note-input"
              />
              <small>{500 - note.length} characters remaining</small>
            </div>
            <div className="form-group">
              <label>Notification Method</label>
              <select
                value={notificationMethod}
                onChange={handleNotificationMethodChange}
              >
                <option value="email">Email</option>
                <option value="push">Push Notification</option>
                <option value="calendar">Google Calendar</option>
              </select>
              {notificationMethod === "push" && <PushNotificationButton />}
              {notificationMethod === "calendar" && !isCheckingAuth && (
                <>
                  {isCalendarAuthorized ? (
                    <div className="calendar-status">
                      <span className="success-text">
                        ✓ Connected to Google Calendar
                      </span>
                      <button
                        type="button"
                        className="revoke-btn"
                        onClick={handleRevokeAccess}
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="google-auth-btn"
                      onClick={handleGoogleAuth}
                    >
                      Connect Google Calendar
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="isRecurring"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
              <label htmlFor="isRecurring">Recurring Reminder</label>
            </div>
            {isRecurring && (
              <div className="form-group">
                <label>Recurring Frequency</label>
                <select
                  value={recurringFrequency}
                  onChange={(e) => setRecurringFrequency(e.target.value)}
                  required
                >
                  <option value="">Select Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Reminder"}
            </button>
          </form>

          {/* Display the reminder time in local timezone */}
          {displayReminderTime && (
            <p>
              <strong>Reminder Time:</strong> {displayReminderTime}
            </p>
          )}
        </div>
        <div className="reminderMealDetails">
          <h2>Create Reminder for {name}</h2>
          {image && <img src={image} alt={name} className="meal-image" />}

          <div className="ingredients">
            <h3>Ingredients</h3>
            {ingredients.length > 0 ? (
              <ul>
                {ingredients.map(({ _id, name, quantity, unit }) => (
                  <li key={_id}>
                    {name} - {quantity} {unit}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients listed.</p>
            )}
          </div>

          <div className="howTo">
            <h3>How to Prepare</h3>
            {preparationSteps.length > 0 ? (
              preparationSteps.map(({ _id, description, steps }) => (
                <div key={_id}>
                  <p>
                    <strong>Description:</strong> {description}
                  </p>
                  {steps.length > 0 ? (
                    <ol>
                      {steps.map(({ _id, stepNumber, instruction }) => (
                        <li key={_id}>
                          <strong>Step {stepNumber}:</strong> {instruction}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>No steps provided.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No preparation steps available.</p>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default createReminders;
