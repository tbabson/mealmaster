import { useSelector } from "react-redux";
import { formatPrice } from "../utils/formatPrice";
import Wrapper from "../assets/wrappers/CartTotals";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cart
  );

  return (
    <Wrapper>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Cart Totals</h3>
          {/* SUBTOTAL */}
          <p className="card-text">
            <span>Subtotal:</span>
            <span>{formatPrice(cartTotal)}</span>
          </p>
          {/* SHIPPING */}
          <p className="card-text">
            <span>Shipping:</span>
            <span>{formatPrice(shipping)}</span>
          </p>
          {/* TAX */}
          <p className="card-text">
            <span>Tax:</span>
            <span>{formatPrice(tax)}</span>
          </p>
          {/* ORDER TOTAL */}
          <p className="card-text">
            <span>Total:</span>
            <span>{formatPrice(orderTotal)}</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartTotals;
