import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  useNavigation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/OrderSuccess"; // adjust the path as needed
import { clearCart } from "../Features/Cart/cartSlice";
import customFetch from "../utils/customFetch";
import Loading from "../components/Loading";
import { formatPrice } from "../utils/formatPrice";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Get the session ID from URL query params
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get("session_id");

        if (sessionId) {
          // Fetch order details using session ID
          const response = await customFetch.get(
            `/orders/by-session/${sessionId}`
          );
          setOrderInfo(response.data.order);
        }

        // Clear the cart regardless of whether we have session ID
        dispatch(clearCart());
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [dispatch, location.search]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="order-success-container">
        <div className="order-card">
          <div className="icon-container">
            <svg
              className="check-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="order-title">Order Successful!</h1>
          <p className="order-message">
            Thank you for your order. We'll process your order once payment is
            received.
          </p>

          {orderInfo && (
            <div className="order-details">
              <p className="order-info">
                <strong>Order ID:</strong> {orderInfo._id}
              </p>
              <p className="order-info">
                <strong>Order Date:</strong>{" "}
                {new Date(orderInfo.createdAt).toLocaleDateString()}
              </p>
              <p className="order-info">
                <strong>Total Amount:</strong>{" "}
                {formatPrice(orderInfo.totalPrice)}
              </p>
              <p className="order-info">
                <strong>Status:</strong>{" "}
                <span className="order-status">Processing</span>
              </p>
            </div>
          )}

          <div className="button-container">
            <Link className="btn" to="/orders">
              View Your Orders
            </Link>
            <Link className="btn secondary-button" to="/">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderSuccess;
