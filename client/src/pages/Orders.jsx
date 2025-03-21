import React, { useEffect } from "react";
import {
  useNavigate,
  Link,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../Features/user/userSlice";
import Wrapper from "../assets/wrappers/OrdersWrapper";
import Loading from "../components/Loading";
import { userOrdersQuery } from "../actionsAndLoaders/OrderLoader";
import { formatPrice } from "../utils/formatPrice";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const initialData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  // Get user from Redux store
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const userId = user?._id;
  const isAuthenticated = !!userId;

  // Fetch current user if not available
  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, userLoading, dispatch]);

  // Fetch orders data using React Query with initial data from loader
  const { data, isLoading, error } = useQuery({
    queryKey: ["userOrders", userId],
    queryFn: () => userOrdersQuery(userId),
    initialData: initialData,
    enabled: isAuthenticated, // Only run query if user is authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Handle login redirect
  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: `/orders` } });
  };

  // If user is not authenticated, show login message
  if (!isAuthenticated && !userLoading) {
    return (
      <Wrapper>
        <div className="login-container">
          <h2 className="login-title">Login Required</h2>
          <p>Please log in to view your order history.</p>
          <button className="btn" onClick={handleLoginRedirect}>
            Login
          </button>
        </div>
      </Wrapper>
    );
  }

  // Show loader while fetching data
  if (isLoading || userLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Wrapper>
        <div className="error-message">
          <p>Something went wrong while fetching your orders.</p>
          <p>{error.message || "Please try again later."}</p>
        </div>
      </Wrapper>
    );
  }

  // Ensure orders is an array - fixed data structure access
  const orders = Array.isArray(data?.orders) ? data.orders : [];

  // If no orders found
  if (orders.length === 0) {
    return (
      <Wrapper>
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
        </div>
        <div className="no-orders">
          <h2>No orders found</h2>
          <p>You haven't placed any orders yet.</p>
          <Link to="/meals" className="btn">
            Browse Meals
          </Link>
        </div>
      </Wrapper>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get status class name
  const getStatusClassName = (status) => {
    return (status || "unknown").toLowerCase();
  };

  return (
    <Wrapper>
      <div className="orders-header">
        <h1 className="orders-title">My Orders</h1>
        <span className="orders-count">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </span>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-number">
                Order #{order._id.substring(0, 8)}
              </span>
              <span className="order-date">{formatDate(order.createdAt)}</span>
            </div>

            <div className="order-content">
              <div className="order-items">
                <div className="item-preview">
                  <div className="item-images">
                    {(order.cartItems || []).slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image || "/api/placeholder/40/40"}
                        alt={item.name || "Product"}
                        className="item-image"
                      />
                    ))}
                  </div>
                  <span className="items-count">
                    {(order.cartItems || []).length}{" "}
                    {(order.cartItems || []).length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <div className="order-total">
                  {formatPrice(order.totalAmount || 0)}
                </div>
                <div
                  className={`status-badge ${getStatusClassName(order.status)}`}
                >
                  {order.status || "Unknown"}
                </div>
              </div>

              <Link to={`/orders/${order._id}`} className="view-button">
                View Order Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Orders;
