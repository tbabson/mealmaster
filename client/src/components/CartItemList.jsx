import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Wrapper from "../assets/wrappers/CartItemList";

const CartItemList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  if (error) {
    return (
      <p>
        Error loading cart:{" "}
        {typeof error === "string" ? error : "Authentication error"}
      </p>
    );
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <Wrapper>
      <div className="cart-list">
        {cartItems.map((meal) => (
          <div key={meal.mealID} className="cart-item-container">
            <CartItem meal={meal} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default CartItemList;
