import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/SingleOrderWrapper";
import Loading from "../components/Loading";
import { formatDistanceToNow } from "date-fns";
import { formatPrice } from "../utils/formatPrice";

const SingleOrder = () => {
  const navigate = useNavigate();
  const { order } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Display a loading state if order data is not yet available
  if (!order) {
    return (
      <Wrapper>
        <div className="error-container">
          <p>Order not found.</p>
          <button className="back-button" onClick={() => navigate("/orders")}>
            Back to Orders
          </button>
        </div>
      </Wrapper>
    );
  }

  // Helper to format dates
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Wrapper>
      <h1>Order Details</h1>

      <div className="order-header">
        <p>
          Order ID:{" "}
          <span className="order-id">
            {order.transactionId ? order.transactionId : order._id}
          </span>
        </p>
        <p>
          Tracking Number:{" "}
          <span className="order-id">{order.trackingNumber || "N/A"}</span>
        </p>
        <p>Placed: {formatDate(order.createdAt)}</p>
      </div>

      <div className="section">
        <h2>Items</h2>
        <div className="item-list">
          {order.cartItems && order.cartItems.length > 0 ? (
            order.cartItems.map((item, index) => {
              // Compute total price from the ingredients array
              const mealPrice = item.ingredients
                ? item.ingredients.reduce(
                    (sum, ing) => sum + ing.price * ing.quantity,
                    0
                  )
                : 0;
              // Use item.quantity if it exists, otherwise assume quantity is 1
              const quantity = item.quantity || 1;

              return (
                <div key={index} className="order-item">
                  <h3>{item.name}</h3>
                  <p className="price">{formatPrice(mealPrice)}</p>
                  <p className="quantity">Qty: {quantity}</p>
                </div>
              );
            })
          ) : (
            <p>No items in this order.</p>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Order Summary</h2>
        <div className="order-summary">
          <p className="total">
            <span>Total Amount:</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </p>
          <p className="status">
            <span>Status:</span>
            <span>{order.status}</span>
          </p>
          <p className="status">
            <span>Delivery Status:</span>
            <span>{order.deliveryStatus}</span>
          </p>
          <p>
            <span>Payment Method:</span>
            <span>{order.paymentMethod}</span>
          </p>
          {order.isPaid ? (
            <p className="paid">
              <span>Payment Status:</span>
              <span>
                Paid{" "}
                {order.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}
              </span>
            </p>
          ) : (
            <p className="not-paid">
              <span>Payment Status:</span>
              <span>Not Paid</span>
            </p>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Shipping Address</h2>
        <div className="shipping-address">
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
          <p>{order.shippingAddress.phone}</p>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/orders")}>
        Back to Orders
      </button>
    </Wrapper>
  );
};

export default SingleOrder;
