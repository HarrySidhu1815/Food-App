import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";

const requestConfig = {};
const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Meals = () => {
  const {
    data: availableMeals,
    isLoading,
    error,
  } = useHttp(`${SERVER_URL}/meals`, requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals ...</p>;
  }
  if(error){
    return <Error title='Failed to Fetch data' message={error}/>
  }
  return (
    <ul id="meals">
      {availableMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
