import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import Wrapper from "../assets/wrappers/checkout";
import customFetch from "../utils/customFetch";
import { formatPrice } from "../utils/formatPrice";

// Components
import { FormRow, Loading, SectionTitle } from "../components";

// Redux actions
import { clearCart } from "../Features/Cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation.location]);

  // Get cart and user data from Redux store
  const {
    cartItems = [],
    cartTotal,
    shipping,
    tax,
    orderTotal,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // State for shipping and payment info
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.fullName || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Bank account details
  const bankDetails = {
    bankName: "First Bank of Nigeria",
    accountName: "BabaTunde Taiwo Adekunle",
    accountNumber: "3057609192",
    // swiftCode: "FBNINGLA",
  };

  // Check if cart is empty and redirect if it is
  useEffect(() => {
    if (!cartItems.length) {
      // toast.error("payment not made");
      navigate("/");
    }
  }, [cartItems, navigate]);

  // Handle changes to shipping info form
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  // Handle form submission to create order
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const { fullName, address, city, postalCode, country, phone } =
      shippingInfo;
    if (!fullName || !address || !city || !postalCode || !country || !phone) {
      toast.error("Please fill in all shipping information fields");
      return;
    }

    // Process based on payment method
    if (paymentMethod === "stripe") {
      processStripePayment();
    } else if (paymentMethod === "bankTransfer" && transferConfirmed) {
      processBankTransfer();
    } else if (paymentMethod === "bankTransfer" && !transferConfirmed) {
      toast.error("Please confirm your bank transfer before proceeding");
    }
  };

  // Process Stripe payment
  const processStripePayment = async () => {
    try {
      setIsLoading(true);

      // Create payment intent on the server
      const response = await customFetch.post(
        "/payment/create-stripe-session",
        {
          cartItems,
          shippingAddress: shippingInfo,
          userId: user._id,
          totalAmount: orderTotal,
        }
      );

      // Load Stripe and redirect to checkout
      const stripe = await loadStripe(
        "pk_test_51R3cj1AHONjyWeGBGDT4uBTbaaNSwlPpe7a2kRUrU2q8p79e1gvmL6wsmogs8i6ClS2iEcSvQ0CqQovg15IcED5U00yJwodQfV"
      );
      const { sessionId } = response.data;

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment processing failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Process Bank Transfer
  // Process Bank Transfer
  const processBankTransfer = async () => {
    try {
      setIsLoading(true);

      // Create order with bank transfer details
      const response = await customFetch.post("/payment/orders/place", {
        cartItems: cartItems,
        shippingAddress: shippingInfo,
        paymentMethod: "bankTransfer",
        paymentResult: {
          status: "pending",
          update_time: new Date().toISOString(),
        },
        taxPrice: tax,
        shippingPrice: shipping,
        totalAmount: orderTotal,
        isPaid: false, // Mark as not paid yet since it needs verification
        transactionId: `BT-${Date.now()}`, // Generate a unique transaction ID
      });

      // Check if the response is successful
      if (response && response.status >= 200 && response.status < 300) {
        // Clear cart and navigate to success page
        dispatch(clearCart());
        toast.success(
          "Order placed successfully! We will process it once payment is verified."
        );

        // Force navigation after a short delay to ensure state updates are processed
        setTimeout(() => {
          navigate("/order-success", { replace: true });
        }, 300);
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process order");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle transfer confirmation
  const toggleTransferConfirmation = () => {
    setTransferConfirmed(!transferConfirmed);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <SectionTitle title={"Checkout"} className="title" />

      <div className="checkout-container">
        {/* Left Column - Order Form */}
        <div>
          <div className="checkout-card">
            <SectionTitle title={"Shipping Address"} />
            <form onSubmit={handleOrderSubmit}>
              <FormRow
                className="formRow-input"
                type="text"
                name="fullName"
                labelText="Full Name"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
              />
              <FormRow
                type="text"
                name="address"
                labelText="Address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
              />
              <div className="form-grid">
                <FormRow
                  type="text"
                  name="city"
                  labelText="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                />
                <FormRow
                  type="text"
                  name="postalCode"
                  labelText="Postal Code"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                />
              </div>
              <FormRow
                type="text"
                name="country"
                labelText="Country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
              />
              <FormRow
                type="text"
                name="phone"
                labelText="Phone Number"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
              />

              <div className="payment-methods">
                <SectionTitle title={"Payment Method"} />
                <div className="payment-options">
                  <label className="payment-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                    />
                    <span>Credit/Debit Card (Stripe)</span>
                  </label>
                  <label className="payment-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={paymentMethod === "bankTransfer"}
                      onChange={() => setPaymentMethod("bankTransfer")}
                    />
                    <span>Bank Transfer</span>
                  </label>
                </div>
              </div>

              {paymentMethod === "stripe" && (
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Payment"}
                </button>
              )}

              {paymentMethod === "bankTransfer" && (
                <div className="bank-transfer-container">
                  <div className="bank-details">
                    <h4>Bank Account Details</h4>
                    <p>
                      <strong>Bank Name:</strong> {bankDetails.bankName}
                    </p>
                    <p>
                      <strong>Account Name:</strong> {bankDetails.accountName}
                    </p>
                    <p>
                      <strong>Account Number:</strong>{" "}
                      {bankDetails.accountNumber}
                    </p>
                    {/* <p>
                      <strong>Swift Code:</strong> {bankDetails.swiftCode}
                    </p> */}
                    <p className="bank-instruction">
                      Please transfer {formatPrice(orderTotal)} to the account
                      above. After making the transfer, check the box below and
                      click "Confirm Order".
                    </p>
                  </div>
                  <div className="transfer-confirmation">
                    <label className="confirmation-label">
                      <input
                        type="checkbox"
                        checked={transferConfirmed}
                        onChange={toggleTransferConfirmation}
                      />
                      <span>I confirm that I have made the bank transfer.</span>
                    </label>
                  </div>
                  <button
                    className="btn-primary"
                    type="submit"
                    disabled={isLoading || !transferConfirmed}
                  >
                    {isLoading ? "Processing..." : "Confirm Order"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="checkout-card">
            <SectionTitle title={"Order Summary"} />
            <div>
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                cartItems.map((meal) => (
                  <div className="order-item" key={meal.mealID}>
                    <div className="order-item-header">
                      <div className="order-item-details">
                        {meal.image && (
                          <img
                            className="item-image"
                            src={meal.image}
                            alt={meal.name}
                          />
                        )}
                        <h3 className="item-name">{meal.name}</h3>
                      </div>
                    </div>
                    <ul className="ingredients-list">
                      {meal.ingredients.map((ing) => (
                        <li className="ingredient-item" key={ing.name}>
                          <span>
                            {ing.name} ({ing.quantity} {ing.unit})
                          </span>
                          <span>{formatPrice(ing.price * ing.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>

            <div className="summary-section">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="total-row">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Checkout;
