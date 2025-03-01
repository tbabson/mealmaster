import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  Admin,
  ChangePassword,
  Login,
  Register,
  AddMeal,
  UpdateMeal,
  DeleteMeal,
} from "./pages";

//Actions
import { action as registerAction } from "./actionsAndLoaders/RegisterAction";
import { action as loginAction } from "./actionsAndLoaders/LoginAction";
import store from "./store";

//Loaders
import { loader as mealsLoader } from "./actionsAndLoaders/MealsLoader";
import { loader as singleMealLoader } from "./actionsAndLoaders/SingleMealLoader";

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
        path: "orders",
        element: <Orders />,
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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
