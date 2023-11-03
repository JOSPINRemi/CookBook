import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./components/recipe/recipeSlice";

const store = configureStore({
  //TODO add ingredients slice
  reducer: { recipes: recipeSlice },
});

export default store;
