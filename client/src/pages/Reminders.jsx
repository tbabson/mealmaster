import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import {
  fetchSingleUserReminders,
  deleteReminder,
  updateReminder,
} from "../Features/Reminder/reminderSlice";
import { Loading } from "../components";
import Wrapper, {
  ModalOverlay,
  ModalContent,
  ReminderCard,
} from "../assets/wrappers/UserReminder";
import { AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { FaTimes } from "react-icons/fa";

const Reminders = () => {
  const dispatch = useDispatch();
  const { reminders, isLoading, error } = useSelector(
    (state) => state.reminders
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingReminder, setEditingReminder] = useState(null);
  const [editText, setEditText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState(null);
  const [editTime, setEditTime] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleUserReminders());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to fetch reminders");
  }, [error]);

  const handleDelete = (id) => {
    dispatch(deleteReminder(id))
      .unwrap()
      .then(() => {
        toast.success("Reminder deleted");
        setShowReminderModal(false);
      })
      .catch((err) => toast.error(err.message || "Delete failed"));
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder._id);
    setEditText(reminder.note || "");
    setEditTime(
      new Date(reminder.reminderTime).toISOString().substring(11, 16)
    );
  };

  const handleSaveEdit = () => {
    const currentReminder = reminders.find((r) => r._id === editingReminder);
    const updatedDateTime = new Date(currentReminder.reminderTime);
    const [hours, minutes] = editTime.split(":");
    updatedDateTime.setHours(Number(hours));
    updatedDateTime.setMinutes(Number(minutes));

    dispatch(
      updateReminder({
        id: editingReminder,
        reminderData: {
          note: editText,
          reminderTime: updatedDateTime.toISOString(),
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Reminder updated");
        setEditingReminder(null);
        setEditText("");
        setEditTime("");
      })
      .catch((err) => toast.error(err.message || "Update failed"));
  };

  const remindersForSelectedDate = (reminders || []).filter((r) => {
    const reminderDate = new Date(r.reminderTime);
    return (
      reminderDate.getFullYear() === selectedDate.getFullYear() &&
      reminderDate.getMonth() === selectedDate.getMonth() &&
      reminderDate.getDate() === selectedDate.getDate()
    );
  });

  const handleReminderClick = (reminder) => {
    setSelectedReminder(reminder);
    setEditText(reminder.note || "");
    setEditTime(
      new Date(reminder.reminderTime).toISOString().substring(11, 16)
    );
    setShowReminderModal(true);
  };

  return (
    <Wrapper>
      <div className="calendar-section">
        <h2 className="title">My Reminders</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>

      <div className="reminder-list">
        <h3 className="subtitle">
          Reminders on {selectedDate.toDateString()}:
        </h3>
        {isLoading ? (
          <Loading />
        ) : remindersForSelectedDate.length === 0 ? (
          <p>No reminders found.</p>
        ) : (
          <ul>
            <AnimatePresence>
              {remindersForSelectedDate.map((reminder) => (
                <ReminderCard
                  key={reminder._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleReminderClick(reminder)}
                  style={{ cursor: "pointer" }}
                >
                  <h4>{reminder.meal ? reminder.meal.name : "Unnamed Meal"}</h4>
                  <p>
                    Time:{" "}
                    {moment(reminder.reminderTime).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  </p>
                  <p>Method: {reminder.notificationMethod}</p>
                  <p>Recurring: {reminder.isRecurring ? "Yes" : "No"}</p>
                  {reminder.isRecurring && (
                    <p>Frequency: {reminder.recurringFrequency}</p>
                  )}
                  {reminder.note && (
                    <div className="reminder-note">
                      <p className="note-label">Note:</p>
                      <p className="note-content">{reminder.note}</p>
                    </div>
                  )}
                </ReminderCard>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <AnimatePresence>
        {showReminderModal && selectedReminder && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                className="close-modal-btn"
                onClick={() => setShowReminderModal(false)}
              >
                <FaTimes />
              </button>

              <div className="modal-content">
                <h3>{selectedReminder.meal?.name || "Unnamed Meal"}</h3>

                {editingReminder === selectedReminder._id ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Time:</label>
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="edit-time-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Note:</label>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Add a note..."
                        rows="3"
                        maxLength="500"
                        className="edit-note-input"
                      />
                      <small>
                        {500 - editText.length} characters remaining
                      </small>
                    </div>
                    <div className="btn-group">
                      <button className="save-btn" onClick={handleSaveEdit}>
                        Save Changes
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingReminder(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="reminder-details">
                    <p>
                      <strong>Time:</strong>{" "}
                      {moment(selectedReminder.reminderTime).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    </p>
                    <p>
                      <strong>Method:</strong>{" "}
                      {selectedReminder.notificationMethod}
                    </p>
                    <p>
                      <strong>Recurring:</strong>{" "}
                      {selectedReminder.isRecurring ? "Yes" : "No"}
                    </p>
                    {selectedReminder.isRecurring && (
                      <p>
                        <strong>Frequency:</strong>{" "}
                        {selectedReminder.recurringFrequency}
                      </p>
                    )}
                    {selectedReminder.note && (
                      <div className="note-section">
                        <strong>Note:</strong>
                        <p>{selectedReminder.note}</p>
                      </div>
                    )}
                    <div className="btn-group">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(selectedReminder)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setReminderToDelete(selectedReminder);
                          setShowReminderModal(false);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ModalContent>
          </ModalOverlay>
        )}

        {showDeleteModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p>Are you sure you want to delete this reminder?</p>
              <div className="btn-group">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    handleDelete(reminderToDelete._id);
                    setShowDeleteModal(false);
                  }}
                >
                  Yes, delete
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Reminders;
