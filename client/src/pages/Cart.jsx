import { useSelector } from "react-redux";
import { CartItemList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Cart";

const Cart = () => {
  const { numItemsInCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user); // Check if user is logged in

  if (!user) {
    return (
      <Wrapper>
        <SectionTitle
          className="center-title"
          description="Login to add meals to your cart."
        />
        <div className="login-prompt">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </Wrapper>
    );
  }

  if (numItemsInCart === 0) {
    return <SectionTitle description="Your cart is empty." />;
  }

  return (
    <Wrapper>
      <>
        <SectionTitle title="Shopping Cart" description="Your cart items" />
        <div className="cartContainer">
          <div className="cartItemList">
            <CartItemList />
          </div>
          <div className="cartTotals">
            <CartTotals />
            <Link to="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Cart;
