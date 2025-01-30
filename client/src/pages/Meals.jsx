// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import customFetch from "../utils/customFetch";
// import { CurrentUser } from "../components";

//const MealsContext = createContext();

const Meals = () => {
  // const navigate = useNavigate();

  // const logoutUser = async () => {
  //   navigate("/");
  //   await customFetch.get("/auth/logout");
  //   toast.success("Logging out...");
  // };

  return (
    <div className="">
      {/* <CurrentUser /> */}
      <h1>Meals</h1>;
    </div>
  );
};

// export const useMealsContext = () => useContext(MealsContext);
export default Meals;
