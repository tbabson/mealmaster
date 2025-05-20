import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchUserReminders,
  deleteReminder,
  updateReminder,
  sendPushNotification,
  syncWithCalendar,
  createReminder,
} from "../Features/Reminder/reminderSlice";
import Wrapper from "../assets/wrappers/AdminReminders";
import { FormRow, FormRowSelect } from "../components";
import {
  FaPlus,
  FaList,
  FaEdit,
  FaTrash,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";
import moment from "moment";

const AdminReminders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, reminders, currentReminder } = useSelector(
    (store) => store.reminders
  );

  const [showForm, setShowForm] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reminderForm, setReminderForm] = useState({
    meal: "",
    reminderTime: "",
    notificationMethod: "email",
    isRecurring: false,
    recurringFrequency: "daily",
    note: "",
  });

  useEffect(() => {
    dispatch(fetchUserReminders());
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updateReminder({
            id: selectedReminder._id,
            reminderData: reminderForm,
          })
        ).unwrap();
      } else {
        await dispatch(createReminder(reminderForm)).unwrap();
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save reminder:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleEdit = (reminder) => {
    setSelectedReminder(reminder);
    setReminderForm({
      meal: reminder.meal._id,
      reminderTime: moment(reminder.reminderTime).format("YYYY-MM-DDTHH:mm"),
      notificationMethod: reminder.notificationMethod,
      isRecurring: reminder.isRecurring,
      recurringFrequency: reminder.recurringFrequency || "daily",
      note: reminder.note,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      await dispatch(deleteReminder(id));
    }
  };

  const handleSendNotification = async (id) => {
    await dispatch(sendPushNotification(id));
  };

  const handleSync = async (id) => {
    await dispatch(syncWithCalendar(id));
  };

  const resetForm = () => {
    setReminderForm({
      meal: "",
      reminderTime: "",
      notificationMethod: "email",
      isRecurring: false,
      recurringFrequency: "daily",
      note: "",
    });
    setSelectedReminder(null);
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <Wrapper>
      <div className="admin-content">
        <div className="header">
          <h2>
            {showForm
              ? isEditing
                ? "Edit Reminder"
                : "Create New Reminder"
              : "All Reminders"}
          </h2>
          <button
            className="btn create-btn"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) resetForm();
            }}
          >
            {showForm ? <FaList /> : <FaPlus />}
            {showForm ? "View Reminders" : "Create Reminder"}
          </button>
        </div>

        {showForm ? (
          <div className="reminder-form">
            <form onSubmit={handleSubmit}>
              <FormRowSelect
                labelText="Meal"
                name="meal"
                value={reminderForm.meal}
                handleChange={(e) =>
                  setReminderForm({ ...reminderForm, meal: e.target.value })
                }
                list={[]} // Will need to populate with meals
              />

              <FormRow
                type="datetime-local"
                name="reminderTime"
                value={reminderForm.reminderTime}
                handleChange={(e) =>
                  setReminderForm({
                    ...reminderForm,
                    reminderTime: e.target.value,
                  })
                }
                labelText="Reminder Time"
              />

              <FormRowSelect
                labelText="Notification Method"
                name="notificationMethod"
                value={reminderForm.notificationMethod}
                handleChange={(e) =>
                  setReminderForm({
                    ...reminderForm,
                    notificationMethod: e.target.value,
                  })
                }
                list={["email", "push", "calendar"]}
              />

              <div className="form-row">
                <label>
                  <input
                    type="checkbox"
                    checked={reminderForm.isRecurring}
                    onChange={(e) =>
                      setReminderForm({
                        ...reminderForm,
                        isRecurring: e.target.checked,
                      })
                    }
                  />{" "}
                  Recurring Reminder
                </label>
              </div>

              {reminderForm.isRecurring && (
                <FormRowSelect
                  labelText="Frequency"
                  name="recurringFrequency"
                  value={reminderForm.recurringFrequency}
                  handleChange={(e) =>
                    setReminderForm({
                      ...reminderForm,
                      recurringFrequency: e.target.value,
                    })
                  }
                  list={["daily", "weekly", "monthly"]}
                />
              )}

              <div className="form-row">
                <label htmlFor="note">Note</label>
                <textarea
                  id="note"
                  name="note"
                  value={reminderForm.note}
                  onChange={(e) =>
                    setReminderForm({ ...reminderForm, note: e.target.value })
                  }
                  maxLength="500"
                />
              </div>

              <button type="submit" className="btn submit-btn">
                {isEditing ? "Update Reminder" : "Create Reminder"}
              </button>
            </form>
          </div>
        ) : (
          <div className="reminders-list">
            {isLoading ? (
              <div className="loading-container">Loading reminders...</div>
            ) : !reminders || !Array.isArray(reminders) ? (
              <div className="loading-container">No reminders found</div>
            ) : reminders.length === 0 ? (
              <div className="loading-container">No reminders available</div>
            ) : (
              <div className="reminders-grid">
                {reminders.map((reminder) => (
                  <div key={reminder._id} className="reminder-card">
                    <div className="reminder-info">
                      {" "}
                      <p className="meal-name">{reminder.meal.name}</p>{" "}
                      <p className="time">
                        {moment(reminder.reminderTime).format(
                          "MMMM Do YYYY, h:mm a"
                        )}
                      </p>
                      <p className="creator-info">
                        <span className="creator-name">
                          Created by:{" "}
                          {reminder.userDetails?.fullName || "Unknown User"}
                        </span>
                        <span className="creator-email">
                          ({reminder.userDetails?.email || "No email"})
                        </span>
                      </p>
                      <div>
                        {reminder.isRecurring && (
                          <span className="badge recurring">
                            {reminder.recurringFrequency}
                          </span>
                        )}
                        <span className="badge method">
                          {reminder.notificationMethod}
                        </span>
                      </div>
                      {reminder.note && <p className="note">{reminder.note}</p>}
                    </div>
                    <div className="reminder-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(reminder)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="notify-btn"
                        onClick={() => handleSendNotification(reminder._id)}
                      >
                        <FaBell /> Notify
                      </button>
                      <button
                        className="sync-btn"
                        onClick={() => handleSync(reminder._id)}
                      >
                        <FaCalendarAlt /> Sync
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(reminder._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminReminders;
