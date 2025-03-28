import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { fetchCart } from "./Features/Cart/cartSlice";
import store, { persistor } from "./store";
import {
  HomeLayout,
  Blog,
  Profile,
  Cart,
  Error,
  Meals,
  SingleMeal,
  Checkout,
  Orders,
  SingleOrder,
  Admin,
  ChangePassword,
  Login,
  Register,
  AddMeal,
  UpdateMeal,
  DeleteMeal,
  Reminder,
} from "./pages";
import OrderSuccess from "./pages/OrderSuccess";

//Actions
import { action as registerAction } from "./actionsAndLoaders/RegisterAction";
import { action as loginAction } from "./actionsAndLoaders/LoginAction";
// import { action as reminderAction } from "./actionsAndLoaders/ReminderAction";

//Loaders
import { loader as mealsLoader } from "./actionsAndLoaders/MealsLoader";
import { loader as singleMealLoader } from "./actionsAndLoaders/SingleMealLoader";
import { loader as ordersLoader } from "./actionsAndLoaders/OrderLoader";
import { loader as singleOrder } from "./actionsAndLoaders/SingleOrderLoader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Meals />,
        loader: mealsLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: "/meals",
        element: <Meals />,
        loader: mealsLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: "meals/:id",
        element: <SingleMeal />,
        loader: singleMealLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: ordersLoader(queryClient, store),
      },
      {
        path: "/orders/:orderId",
        element: <SingleOrder />,
        loader: singleOrder(queryClient),
      },
      {
        path: "/reminders",
        element: <Reminder />,
        // action: reminderAction,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction(queryClient),
    errorElement: <Error />,
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
    errorElement: <Error />,
  },
  {
    path: "changePassword",
    element: <ChangePassword />,
    errorElement: <Error />,
  },
  {
    path: "admin",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        path: "addMeal",
        element: <AddMeal />,
      },
      {
        path: "updateMeal/:id",
        element: <UpdateMeal />,
      },
      {
        path: "deleteMeal/:id",
        element: <DeleteMeal />,
      },
    ],
  },
]);

// Cart initialization component
const CartInitializer = () => {
  const dispatch = store.dispatch;
  const state = store.getState();

  useEffect(() => {
    // When user is logged in, fetch their cart from the server
    if (state.user?.user?._id) {
      dispatch(fetchCart(state.user.user._id));
    }
  }, [dispatch, state.user?.user?._id]);

  return null; // This component doesn't render anything
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <CartInitializer />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
