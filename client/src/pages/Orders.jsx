import React, { useEffect } from "react";
import {
  useNavigate,
  Link,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Wrapper from "../assets/wrappers/OrdersWrapper";
import Loading from "../components/Loading";
import { formatPrice } from "../utils/formatPrice";

const Orders = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { orders } = useLoaderData(); // Orders are preloaded via the loader

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  // Ensure orders is an array
  const ordersArray = Array.isArray(orders) ? orders : [];

  // If no orders found
  if (ordersArray.length === 0) {
    return (
      <Wrapper>
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
        </div>
        <div className="no-orders">
          <h2>No orders found</h2>
          <p>Sign in to see your order update.</p>
          <Link to="/login" className="btn">
            Sign In
          </Link>
        </div>
      </Wrapper>
    );
  }

  // Helper: Format the order date for display
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Helper: Create a CSS-friendly class name for the order status
  const getStatusClassName = (status) => (status || "unknown").toLowerCase();

  return (
    <Wrapper>
      <div className="orders-header">
        <h1 className="orders-title">My Orders</h1>
        <span className="orders-count">
          {ordersArray.length} {ordersArray.length === 1 ? "Order" : "Orders"}
        </span>
      </div>
      <div className="orders-grid">
        {ordersArray.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-number">
                Order #
                {order.transactionId
                  ? order.transactionId
                  : order._id.substring(0, 8)}
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
                        alt={item.name || "Meal"}
                        className="item-image"
                        loading="lazy"
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
