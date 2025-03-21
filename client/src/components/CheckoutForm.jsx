import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import SubmitBtn from "./SubmitBtn";
import { formatPrice } from "../utils/formatPrice";
import customFetch from "../utils/customFetch";
import { clearCart } from "../Features/Cart/cartSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().user.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("Order placed successfully");
      return redirect(`/orders/${response.data.order._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);

      return error;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="post" className="form">
      <h4 className="form-title">Shipping information</h4>
      <FormInput label="full name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div>
        <SubmitBtn text="place order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
