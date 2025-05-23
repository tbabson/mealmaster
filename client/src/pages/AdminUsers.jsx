import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaCalendar,
  FaShoppingCart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AdminUsers";
import { FormRow, FormRowSelect } from "../components";
import { adminUsersQuery } from "../actionsAndLoaders/AdminUsersLoader";
import Loading from "../components/Loading";
import { formatPrice } from "../utils/formatPrice";
import customFetch from "../utils/customFetch";

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchValues = {} } = useLoaderData();

  // Component state
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filters, setFilters] = useState({
    search: searchValues.search || "",
    role: searchValues.role || "all",
    sort: searchValues.sort || "newest",
    page: Number(searchValues.page) || 1,
  });
  // Fetch users data
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    ...adminUsersQuery({
      search: filters.search,
      role: filters.role,
      sort: filters.sort,
      page: filters.page,
    }),
    keepPreviousData: true,
  });

  const {
    users = [],
    totalUsers = 0,
    numOfPages = 1,
    currentPage = 1,
  } = usersData || {};

  // Fetch selected user details
  const {
    data: selectedUserData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      const response = await customFetch.get(`/users/${selectedUserId}`);
      const data = await response.data;
      return {
        user: data.user,
        orders: data.orders || [],
        cartItems: data.cartItems || [],
        reminders: data.reminders || [],
      };
    },
    enabled: !!selectedUserId && showUserDetails,
    retry: 1,
  });

  const selectedUser = selectedUserData?.user;
  const userOrders = selectedUserData?.orders || [];
  const userCartItems = selectedUserData?.cartItems || [];
  const userReminders = selectedUserData?.reminders || [];

  // Update filters when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters((prev) => ({
      search: params.get("search") || "",
      role: params.get("role") || "all",
      sort: params.get("sort") || "newest",
      page: Number(params.get("page")) || 1,
    }));
  }, [location.search]);

  // Loading and error states
  if ((showUserDetails && isLoadingUser) || isLoading) {
    return (
      <Wrapper>
        <div className="admin-content">
          <Loading />
        </div>
      </Wrapper>
    );
  }

  if (error || (showUserDetails && userError)) {
    return (
      <Wrapper>
        <div className="admin-content">
          <div className="error-container">
            <h3>Error</h3>
            <p>
              {error?.message || userError?.message || "Something went wrong"}
            </p>
            {userError && (
              <button
                className="btn back-btn"
                onClick={() => setShowUserDetails(false)}
              >
                Back to Users
              </button>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };

    // Reset page when changing other filters
    if (field !== "page") {
      newFilters.page = 1;
    }

    // Update URL with new filters
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val && val !== "all" && val !== "") {
        params.set(key, val);
      }
    });

    // Update state and URL
    setFilters(newFilters);
    navigate(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "all",
      sort: "newest",
      page: 1,
    });
    navigate("");
  };

  const handleViewUser = async (userId) => {
    setSelectedUserId(userId);
    setShowUserDetails(true);
  };

  const handleBackToUsers = () => {
    setShowUserDetails(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`/api/v1/users/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete user");

        toast.success("User deleted successfully");
        await queryClient.invalidateQueries(["adminUsers"]);

        // If we're in user details view, go back to list
        if (showUserDetails) {
          handleBackToUsers();
        }
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
      }
    }
  };

  return (
    <Wrapper>
      <div className="admin-content">
        <div className="header">
          <h2>
            {showUserDetails ? "User Details" : "All Users"}
            {!showUserDetails && (
              <span className="user-count">({totalUsers} users)</span>
            )}
          </h2>
          {showUserDetails && (
            <button className="btn back-btn" onClick={handleBackToUsers}>
              <FaUser />
              Back to Users
            </button>
          )}
        </div>

        {showUserDetails && selectedUser ? (
          <div className="user-details">
            <div className="user-profile-card">
              <div className="user-avatar">
                {selectedUser.profileImage ? (
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.fullName}
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {selectedUser.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="user-info">
                <h3>{selectedUser.fullName}</h3>
                <p className="user-email">
                  <FaEnvelope /> {selectedUser.email}
                </p>
                <p className="user-role">
                  Role:{" "}
                  <span className={`role-badge ${selectedUser.role}`}>
                    {selectedUser.role}
                  </span>
                </p>
                <p className="user-joined">
                  <FaCalendar /> Joined:{" "}
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="user-stats">
              <div className="stat-card">
                <h4>Orders</h4>
                <p className="stat-number">{userOrders.length}</p>
              </div>
              <div className="stat-card">
                <h4>Cart Items</h4>
                <p className="stat-number">{userCartItems.length}</p>
              </div>
              <div className="stat-card">
                <h4>Reminders</h4>
                <p className="stat-number">{userReminders.length}</p>
              </div>
              <div className="stat-card">
                <h4>Google Calendar</h4>
                <p className="stat-status">
                  {selectedUser?.googleCalendarSyncEnabled
                    ? "Enabled"
                    : "Disabled"}
                </p>
              </div>
            </div>

            {userOrders.length > 0 && (
              <div className="user-orders">
                <h4>Recent Orders</h4>
                <div className="orders-list">
                  {userOrders.slice(0, 5).map((order) => (
                    <div key={order._id} className="order-item">
                      <p>Order #{order._id.slice(-6)}</p>
                      <p>Status: {order.status}</p>
                      <p>Total: {formatPrice(order.totalAmount)}</p>
                      <p>
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userCartItems.length > 0 && (
              <div className="user-orders">
                <h4>Current Cart Items</h4>
                <div className="orders-list">
                  {userCartItems.slice(0, 5).map((item) => (
                    <div key={item._id} className="order-item">
                      <p>{item.meal?.title || "Unavailable Meal"}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {formatPrice(item.price)}</p>
                      <p>
                        Added: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userReminders.length > 0 && (
              <div className="user-orders">
                <h4>Recent Reminders</h4>
                <div className="orders-list">
                  {userReminders.slice(0, 5).map((reminder) => (
                    <div key={reminder._id} className="order-item">
                      <p>{reminder.title}</p>
                      <p>Status: {reminder.status}</p>
                      <p>
                        Time:{" "}
                        {new Date(reminder.reminderTime).toLocaleTimeString()}
                      </p>
                      <p>
                        Date:{" "}
                        {new Date(reminder.reminderTime).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="users-list">
            <div className="filters-container">
              <FormRow
                type="text"
                name="search"
                labelText="Search Users"
                value={filters.search}
                handleChange={(e) =>
                  handleFilterChange("search", e.target.value)
                }
                placeholder="Search by name or email..."
              />

              <FormRowSelect
                labelText="Role"
                name="role"
                value={filters.role}
                handleChange={(e) => handleFilterChange("role", e.target.value)}
                list={["all", "user", "admin"]}
              />

              <FormRowSelect
                labelText="Sort"
                name="sort"
                value={filters.sort}
                handleChange={(e) => handleFilterChange("sort", e.target.value)}
                list={["newest", "oldest", "a-z", "z-a"]}
              />

              <button className="btn clear-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>

            {users.length === 0 ? (
              <div className="empty-state">
                <h4>No users found matching your criteria</h4>
              </div>
            ) : (
              <div className="users-grid">
                {users.map((user) => (
                  <div key={user._id} className="user-card">
                    <div className="user-avatar">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.fullName} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="user-info">
                      <h3>{user.fullName}</h3>
                      <p className="user-email">{user.email}</p>
                      <p className="user-role">
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </p>
                      <p className="user-joined">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      <div className="user-stats-mini">
                        <span>
                          <FaShoppingCart /> {user.orders?.length || 0} orders
                        </span>
                      </div>
                    </div>
                    <div className="user-actions">
                      <button
                        className="btn view-btn"
                        onClick={() => handleViewUser(user._id)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {user.role !== "admin" && (
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDeleteUser(user._id)}
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {numOfPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handleFilterChange("page", 1)}
                  disabled={currentPage === 1}
                  className="btn btn-first"
                >
                  First
                </button>
                <button
                  onClick={() =>
                    handleFilterChange("page", Math.max(1, currentPage - 1))
                  }
                  disabled={currentPage === 1}
                  className="btn btn-prev"
                >
                  Prev
                </button>
                <span className="page-info">
                  Page {currentPage} of {numOfPages}
                </span>
                <button
                  onClick={() =>
                    handleFilterChange(
                      "page",
                      Math.min(numOfPages, currentPage + 1)
                    )
                  }
                  disabled={currentPage === numOfPages}
                  className="btn btn-next"
                >
                  Next
                </button>
                <button
                  onClick={() => handleFilterChange("page", numOfPages)}
                  disabled={currentPage === numOfPages}
                  className="btn btn-last"
                >
                  Last
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminUsers;
