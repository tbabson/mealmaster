import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Reminder";
import { createReminder } from "../Features/Reminder/reminderSlice"; // Updated import
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Reminder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get meal from location state
  const mealFromState = location.state?.meal;
  const [meal, setMeal] = useState(mealFromState?._id || "");
  const [reminderTime, setReminderTime] = useState("");
  const [notificationMethod, setNotificationMethod] = useState("email");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("");

  // Get loading and error states from Redux
  const { isLoading, error } = useSelector((state) => state.reminders);

  useEffect(() => {
    // If no meal passed from state, redirect or show error
    if (!mealFromState) {
      toast.error("Please select a meal first");
      navigate("/meals");
    }
  }, [mealFromState, navigate]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create reminder");
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!reminderTime) {
      toast.error("Please select a reminder time");
      return;
    }

    const reminderData = {
      meal,
      reminderTime,
      notificationMethod,
      isRecurring,
      ...(isRecurring && { recurringFrequency }),
    };

    // Dispatch create reminder action
    dispatch(createReminder(reminderData))
      .unwrap() // Handle success/error
      .then(() => {
        toast.success("Reminder created successfully");
        navigate("/reminders");
      })
      .catch((error) => {
        // Error is already handled in the useEffect
        console.error("Reminder creation failed", error);
      });
  };

  return (
    <Wrapper>
      <h2>Create Reminder for {mealFromState?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Selected Meal</label>
          <input type="text" value={mealFromState?.name || ""} readOnly />
          <input
            type="hidden"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Reminder Time</label>
          <input
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            required
          />
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
    </Wrapper>
  );
};

export default Reminder;
