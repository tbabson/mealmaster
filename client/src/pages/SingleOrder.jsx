import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/SingleOrderWrapper";
import Loading from "../components/Loading";
import { formatDistanceToNow } from "date-fns";
import { formatPrice } from "../utils/formatPrice";
import { createReview } from "../Features/Review/reviewSlice";

const SingleOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useLoaderData();
  const { isLoading: reviewLoading } = useSelector((store) => store.review);

  // State for managing review forms for each item
  const [reviewForms, setReviewForms] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize review forms state for each cart item
  useEffect(() => {
    if (order?.cartItems) {
      const initialForms = {};
      order.cartItems.forEach((item, index) => {
        initialForms[index] = {
          isOpen: false,
          rating: 0,
          hoverRating: 0,
          title: "",
          comment: "",
          submitted: false,
        };
      });
      setReviewForms(initialForms);
    }
  }, [order]);

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

  // Toggle review form for specific item
  const toggleReviewForm = (itemIndex) => {
    setReviewForms((prev) => ({
      ...prev,
      [itemIndex]: {
        ...prev[itemIndex],
        isOpen: !prev[itemIndex].isOpen,
      },
    }));
  };

  // Handle star rating click
  const handleRatingClick = (itemIndex, rating) => {
    setReviewForms((prev) => ({
      ...prev,
      [itemIndex]: {
        ...prev[itemIndex],
        rating,
        hoverRating: 0,
      },
    }));
  };

  // Handle star rating hover
  const handleRatingHover = (itemIndex, rating) => {
    setReviewForms((prev) => ({
      ...prev,
      [itemIndex]: {
        ...prev[itemIndex],
        hoverRating: rating,
      },
    }));
  };

  // Handle input changes
  const handleInputChange = (itemIndex, field, value) => {
    setReviewForms((prev) => ({
      ...prev,
      [itemIndex]: {
        ...prev[itemIndex],
        [field]: value,
      },
    }));
  };

  // Submit review
  const submitReview = async (itemIndex, mealId) => {
    const reviewData = reviewForms[itemIndex];

    if (!reviewData.rating || reviewData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewData.title.trim()) {
      toast.error("Please enter a review title");
      return;
    }

    if (!mealId) {
      toast.error("Meal ID not found");
      console.log("Missing meal ID for item index:", itemIndex);
      return;
    }

    const reviewPayload = {
      rating: reviewData.rating,
      title: reviewData.title.trim(),
      comment: reviewData.comment.trim(),
      meal: mealId,
    };

    try {
      await dispatch(createReview(reviewPayload)).unwrap();

      // Mark as submitted and close form
      setReviewForms((prev) => ({
        ...prev,
        [itemIndex]: {
          ...prev[itemIndex],
          submitted: true,
          isOpen: false,
        },
      }));
    } catch (error) {
      // Error handling is done in the thunk
    }
  };

  // Render star rating component
  const StarRating = ({
    itemIndex,
    rating,
    hoverRating,
    onRatingClick,
    onRatingHover,
  }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (hoverRating || rating) ? "filled" : ""
            }`}
            onClick={() => onRatingClick(itemIndex, star)}
            onMouseEnter={() => onRatingHover(itemIndex, star)}
            onMouseLeave={() => onRatingHover(itemIndex, 0)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Check if order is delivered
  const isDelivered = order.deliveryStatus?.toLowerCase() === "delivered";

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
              const currentReviewForm = reviewForms[index];

              return (
                <div key={index} className="order-item">
                  <h3>{item.name}</h3>
                  <p className="price">{formatPrice(mealPrice)}</p>
                  <p className="quantity">Qty: {quantity}</p>

                  {/* Review Section - Only show if delivered */}
                  {isDelivered && currentReviewForm && (
                    <div className="review-section">
                      {!currentReviewForm.submitted ? (
                        <>
                          <div
                            className="review-toggle"
                            onClick={() => toggleReviewForm(index)}
                          >
                            <span>Write a Review</span>
                            <span
                              className={`arrow ${
                                currentReviewForm.isOpen ? "open" : ""
                              }`}
                            >
                              ▼
                            </span>
                          </div>

                          {currentReviewForm.isOpen && (
                            <div className="review-form">
                              <div className="rating-section">
                                <label>Rating:</label>
                                <StarRating
                                  itemIndex={index}
                                  rating={currentReviewForm.rating}
                                  hoverRating={currentReviewForm.hoverRating}
                                  onRatingClick={handleRatingClick}
                                  onRatingHover={handleRatingHover}
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor={`title-${index}`}>
                                  Review Title:
                                </label>
                                <input
                                  type="text"
                                  id={`title-${index}`}
                                  value={currentReviewForm.title}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Summarize your experience"
                                  maxLength={100}
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor={`comment-${index}`}>
                                  Comment (Optional):
                                </label>
                                <textarea
                                  id={`comment-${index}`}
                                  value={currentReviewForm.comment}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "comment",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Tell us more about your experience..."
                                  rows={4}
                                />
                              </div>

                              <div className="form-actions">
                                <button
                                  type="button"
                                  className="submit-review-btn"
                                  onClick={() =>
                                    submitReview(index, item.mealID)
                                  }
                                  disabled={reviewLoading}
                                >
                                  {reviewLoading
                                    ? "Submitting..."
                                    : "Submit Review"}
                                </button>
                                <button
                                  type="button"
                                  className="cancel-review-btn"
                                  onClick={() => toggleReviewForm(index)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="review-submitted">
                          <span>✓ Review submitted</span>
                        </div>
                      )}
                    </div>
                  )}
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
          <p className="payment-method">
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
