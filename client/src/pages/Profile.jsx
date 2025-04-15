import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown, FaChevronUp, FaEdit, FaCamera } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Profile";
import Loading from "../components/Loading";
import customFetch from "../utils/customFetch";
import { FormRow } from "../components";
import { setUser } from "../Features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState("orders"); // Set orders as default open section
  const fileInputRef = useRef(null);

  // Edit Profile Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
  });

  // Change Password Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser?._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await customFetch.get(`/users/${currentUser._id}`);
        setUserData(response.data);
        setEditFormData({
          fullName: response.data.user.fullName,
          email: response.data.user.email,
        });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser?._id]);

  const toggleAccordion = (section) => {
    if (activeAccordion === section) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(section);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.patch(
        `/users/${currentUser._id}`,
        editFormData
      );
      dispatch(setUser({ ...currentUser, ...editFormData }));
      setShowEditModal(false);
      toast.success("Profile updated successfully");
      // Refresh user data
      const updatedUserData = await customFetch.get(
        `/users/${currentUser._id}`
      );
      setUserData(updatedUserData.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await customFetch.patch("/users/changeUserPassword", {
        oldPassword: passwordFormData.oldPassword,
        newPassword: passwordFormData.newPassword,
      });
      setShowPasswordModal(false);
      setPasswordFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error changing password");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await customFetch.patch(
        `/users/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update both the Redux store and local state with the complete user data
      const updatedUser = response.data.user;
      dispatch(setUser(updatedUser));
      setUserData((prev) => ({
        ...prev,
        user: updatedUser,
      }));
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error updating profile image"
      );
    }
  };

  if (loading) return <Loading />;
  if (!currentUser) return <h2>Please log in to view your profile</h2>;
  if (!userData) return <h2>No user data found...</h2>;

  const { user, orders, reminders, cartItems } = userData;

  return (
    <Wrapper>
      <div className="profile-container">
        <div className="user-details">
          <div className="profile-header">
            <div className="profile-image-container">
              <div className="profile-image" onClick={handleImageClick}>
                {userData?.user?.profileImage ? (
                  <img
                    src={userData.user.profileImage}
                    alt={userData.user.fullName}
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    {userData?.user?.fullName?.charAt(0)}
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
            <h2>{user.fullName}'s Profile</h2>
            <div className="user-info">
              <p>Email: {user.email}</p>
              {user.role === "admin" && <p>Role: {user.role}</p>}
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
                    <div key={order._id} className="order-card">
                      <h4>Order ID: {order._id}</h4>
                      <p>Status: {order.status}</p>
                      <p>Total: ${order.total}</p>
                      <p>
                        Date:{" "}
                        {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}
                      </p>
                    </div>
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
                    <div key={reminder._id} className="reminder-card">
                      <h4>
                        {reminder.meal ? reminder.meal.name : "Unnamed Meal"}
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
                {cartItems.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id} className="order-card">
                      <h4>{item.meal ? item.meal.name : "Unnamed Item"}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

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
