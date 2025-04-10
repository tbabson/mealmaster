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
import Wrapper from "../assets/wrappers/UserReminder"; // styled-components wrapper
import "react-calendar/dist/Calendar.css";

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

  useEffect(() => {
    dispatch(fetchSingleUserReminders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to fetch reminders");
    }
  }, [error]);

  const handleDelete = (id) => {
    dispatch(deleteReminder(id))
      .unwrap()
      .then(() => toast.success("Reminder deleted"))
      .catch((err) => toast.error(err.message || "Delete failed"));
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder._id);
    setEditText(reminder.note || "");
  };

  const handleSaveEdit = () => {
    dispatch(
      updateReminder({ id: editingReminder, reminderData: { note: editText } })
    )
      .unwrap()
      .then(() => {
        toast.success("Reminder updated");
        setEditingReminder(null);
        setEditText("");
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
            {remindersForSelectedDate.map((reminder) => (
              <li key={reminder._id} className="reminder-card">
                <h4>{reminder.title || "Reminder"}</h4>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(reminder.reminderTime).toLocaleTimeString()}
                </p>
                {reminder.meal && (
                  <p>
                    <strong>Meal:</strong> {reminder.meal.name}
                  </p>
                )}

                {editingReminder === reminder._id ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows="3"
                    />
                    <div className="btn-group">
                      <button className="save-btn" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingReminder(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Note:</strong> {reminder.note || "No notes"}
                    </p>
                    <div className="btn-group">
                      <button
                        className="btn edit-btn"
                        onClick={() => handleEdit(reminder)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setReminderToDelete(reminder);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
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
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Reminders;
