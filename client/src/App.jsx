import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
  Landing,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: "meals",
        element: <Meals />,
        errorElement: <Error />,
      },
      {
        path: "meals/:id",
        element: <SingleMeal />,
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
    errorElement: <Error />,
  },
  {
    path: "register",
    element: <Register />,
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
        path: "addFood",
        element: <AddMeal />,
      },
      {
        path: "updateFood",
        element: <UpdateMeal />,
      },
      {
        path: "deleteFood",
        element: <DeleteMeal />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
