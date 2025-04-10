import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Reminder";
import { createReminder } from "../Features/Reminder/reminderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment-timezone";

const Reminder = () => {
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

  // Get loading and error states from Redux
  const { isLoading, error } = useSelector((state) => state.reminders);

  useEffect(() => {
    if (!mealData || Object.keys(mealData).length === 0) {
      navigate("/meals");
    }
  }, [mealData, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create reminder");
    }
  }, [error]);

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
    const utcReminderTime = formattedTime.utc().toISOString(); // Converts to UTC string format

    const reminderData = {
      meal: meal._id, // Change from mealId to meal
      reminderTime: utcReminderTime, // Send the UTC time to the backend
      notificationMethod,
      isRecurring,
      ...(isRecurring && { recurringFrequency }),
    };

    dispatch(createReminder(reminderData))
      .unwrap()
      .then(() => {
        toast.success("Reminder created successfully");
        navigate("/reminders");
      })
      .catch((error) => {
        console.error("Reminder creation failed", error);
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
          <label>Notification Method</label>
          <select
            value={notificationMethod}
            onChange={(e) => setNotificationMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="push">Push Notification</option>
            <option value="calendar">Google Calendar</option>
          </select>
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
    </Wrapper>
  );
};

export default Reminder;
