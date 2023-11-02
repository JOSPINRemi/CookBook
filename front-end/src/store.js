import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./components/recipe/recipeSlice";

const store = configureStore({
  reducer: { recipes: recipeSlice },
});

export default store;
