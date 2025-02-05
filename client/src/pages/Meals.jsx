import { SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { allMealsQuery } from "../actionsAndLoaders/MealsLoader";

const AllMealsContext = createContext();

const Meals = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allMealsQuery(searchValues));
  return (
    <AllMealsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
    </AllMealsContext.Provider>
  );
};

export const useAllMealsContext = () => useContext(AllMealsContext);

export default Meals;
