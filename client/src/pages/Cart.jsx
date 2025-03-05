import { useSelector } from "react-redux";
import { CartItemList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  const numOfMealsInCart = useSelector((state) => state.cart.numItemsInCart);

  if (numOfMealsInCart === 0) {
    return <SectionTitle description="Tour cart is empty" />;
  }

  return (
    <>
      <SectionTitle title="Shopping Cart" description="Your cart items" />
      <div className="cartContainer">
        <div className="cartItemList">
          <CartItemList />
        </div>
        <div className="cartTotals">
          <CartTotals />
          <Link to="/orders" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
