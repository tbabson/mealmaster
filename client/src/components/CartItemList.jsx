import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-list">
      {cartItems.map((meal, index) =>
        meal.mealID ? (
          <div key={`${meal.mealID}-${index}`} className="cart-item-container">
            <CartItem meal={meal} />
          </div>
        ) : null
      )}
    </div>
  );
};

export default CartItemList;
