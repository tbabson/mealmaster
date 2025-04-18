import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaCamera,
  FaTimes,
} from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Profile";
import { ModalOverlay, ModalContent } from "../assets/wrappers/UserReminder";
import Loading from "../components/Loading";
import { FormRow } from "../components";
import { Link, useLoaderData } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { fetchCurrentUser, setUser } from "../Features/user/userSlice";
import {
  fetchSingleUserReminders,
  updateReminder,
  deleteReminder,
} from "../Features/Reminder/reminderSlice";
import customFetch from "../utils/customFetch";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { reminders, isLoading: reminderLoading } = useSelector(
    (state) => state.reminders
  );

  // You'll need to add these selectors for orders and cart items from your Redux store
  const { orders } = useLoaderData(); // Orders are preloaded via the loader
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  // Local state
  const [activeAccordion, setActiveAccordion] = useState("orders");
  const fileInputRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [editText, setEditText] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
  });
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Initial data fetch
  useEffect(() => {
    if (currentUser?._id) {
      dispatch(fetchCurrentUser());
      dispatch(fetchSingleUserReminders());
    }
  }, [dispatch, currentUser?._id]);

  // Update form data when user data changes
  useEffect(() => {
    if (currentUser) {
      setEditFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleReminderClick = (reminder) => {
    setSelectedReminder(reminder);
    setEditText(reminder.note || "");
    setEditTime(
      new Date(reminder.reminderTime).toISOString().substring(11, 16)
    );
    setShowReminderModal(true);
  };

  const handleSaveReminderEdit = () => {
    const updatedDateTime = new Date(selectedReminder.reminderTime);
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
        setEditingReminder(null);
        toast.success("Reminder updated successfully");
      })
      .catch((err) => toast.error(err?.message || "Failed to update reminder"));
  };

  const handleDeleteReminder = (id) => {
    dispatch(deleteReminder(id))
      .unwrap()
      .then(() => {
        setShowReminderModal(false);
        toast.success("Reminder deleted successfully");
      })
      .catch((err) => toast.error(err?.message || "Failed to delete reminder"));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await customFetch.patch(
        "/users/update-profile-image",
        formData
      );
      dispatch(setUser(response.data.user));
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile image"
      );
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.patch(
        "/users/update-profile",
        editFormData
      );
      dispatch(setUser(response.data.user));
      setShowEditModal(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await customFetch.patch("/users/change-password", passwordFormData);
      setShowPasswordModal(false);
      setPasswordFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    }
  };

  if (userLoading || reminderLoading) return <Loading />;
  if (!currentUser) return <h2>Please log in to view your profile</h2>;

  return (
    <Wrapper>
      <div className="profile-container">
        <div className="user-details">
          <div className="profile-header">
            <div className="profile-image-container">
              <div className="profile-image" onClick={handleImageClick}>
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt={currentUser.fullName}
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    {currentUser?.fullName?.charAt(0)}
                  </div>
                )}
                <div className="image-overlay">
                  <FaCamera className="camera-icon" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <h2>{currentUser.fullName}'s Profile</h2>
            <div className="user-info">
              <p>Email: {currentUser.email}</p>
              {currentUser.role === "admin" && <p>Role: {currentUser.role}</p>}
            </div>
            <div className="profile-actions">
              <button
                className="btn edit-btn"
                onClick={() => setShowEditModal(true)}
              >
                <FaEdit /> Edit Profile
              </button>
              <button
                className="btn password-btn"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{reminders.length}</div>
              <div className="stat-label">Active Reminders</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{cartItems.length}</div>
              <div className="stat-label">Cart Items</div>
            </div>
          </div>

          <div className="accordion">
            {/* Orders Section */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion("orders")}
              >
                <h3>Orders</h3>
                {activeAccordion === "orders" ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              <div
                className={`accordion-content ${
                  activeAccordion === "orders" ? "active" : ""
                }`}
              >
                {orders.length === 0 ? (
                  <p>No orders found</p>
                ) : (
                  orders.map((order) => (
                    <Link
                      to={`/orders/${order._id}`}
                      key={order._id}
                      className="order-card"
                    >
                      <h4>Order ID: {order._id}</h4>
                      <p>Status: {order.status}</p>
                      <p>Total: ${order.total}</p>
                      <p>
                        Date:{" "}
                        {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Reminders Section */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion("reminders")}
              >
                <h3>Reminders</h3>
                {activeAccordion === "reminders" ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              <div
                className={`accordion-content ${
                  activeAccordion === "reminders" ? "active" : ""
                }`}
              >
                {reminders.length === 0 ? (
                  <p>No reminders found</p>
                ) : (
                  reminders.map((reminder) => (
                    <div
                      key={reminder._id}
                      className="reminder-card"
                      onClick={(e) => handleReminderClick(reminder, e)}
                      style={{ cursor: "pointer" }}
                    >
                      <h4>
                        {reminder.meal ? reminder.meal.name : "Unnamed Meal"}{" "}
                        <span>Reminder</span>
                      </h4>
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
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Items Section */}
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion("cart")}
              >
                <h3>Cart Items</h3>
                {activeAccordion === "cart" ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              <div
                className={`accordion-content ${
                  activeAccordion === "cart" ? "active" : ""
                }`}
              >
                {Array.isArray(cartItems) && cartItems.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  <>
                    {Array.isArray(cartItems) &&
                      cartItems.map((item) => (
                        <Link to="/cart" key={item._id} className="order-card">
                          <h4>{item.meal ? item.meal.name : "Unnamed Item"}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ${item.price}</p>
                        </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reminder Modal */}
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
                  <h3>
                    {selectedReminder.meal?.name || "Unnamed Meal"}{" "}
                    <span>Reminder</span>
                  </h3>

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
                        <button
                          className="save-btn"
                          onClick={handleSaveReminderEdit}
                        >
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
                          onClick={() =>
                            setEditingReminder(selectedReminder._id)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteReminder(selectedReminder._id)
                          }
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
        </AnimatePresence>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Profile</h3>
              <form onSubmit={handleEditProfile}>
                <FormRow
                  type="text"
                  name="fullName"
                  labelText="Full Name"
                  value={editFormData.fullName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      fullName: e.target.value,
                    })
                  }
                />
                <FormRow
                  type="email"
                  name="email"
                  labelText="Email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                />
                <div className="btn-container">
                  <button type="submit" className="btn submit-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Change Password</h3>
              <form onSubmit={handleChangePassword}>
                <FormRow
                  type="password"
                  name="oldPassword"
                  labelText="Current Password"
                  value={passwordFormData.oldPassword}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      oldPassword: e.target.value,
                    })
                  }
                />
                <FormRow
                  type="password"
                  name="newPassword"
                  labelText="New Password"
                  value={passwordFormData.newPassword}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <FormRow
                  type="password"
                  name="confirmPassword"
                  labelText="Confirm New Password"
                  value={passwordFormData.confirmPassword}
                  onChange={(e) =>
                    setPasswordFormData({
                      ...passwordFormData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="btn-container">
                  <button type="submit" className="btn submit-btn">
                    Change Password
                  </button>
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Profile;
