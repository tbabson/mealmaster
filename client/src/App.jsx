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
  SingleBlog,
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
  AdminLogin,
  Login,
  Register,
  CreateReminder,
  Reminders,
  AdminMeals,
  AdminBlog,
  AdminCart,
  AdminOrders,
  AdminReminders,
  AdminReviews,
  AdminUsers,
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
        path: "blogs/:id",
        element: <SingleBlog />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: ordersLoader(queryClient, store),
        errorElement: <Error />,
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
        path: "/create-reminders",
        element: <CreateReminder />,
      },
      {
        path: "/reminders",
        element: <Reminders />,
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
    path: "admin",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
        action: loginAction(queryClient),
      },
      {
        path: "meals",
        loader: mealsLoader(queryClient),
        element: <AdminMeals />,
      },
      {
        path: "blog",
        element: <AdminBlog />,
      },
      {
        path: "cart",
        element: <AdminCart />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "reminders",
        element: <AdminReminders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "reviews",
        element: <AdminReviews />,
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
