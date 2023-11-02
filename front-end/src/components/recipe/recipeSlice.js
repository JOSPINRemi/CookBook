import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const INGREDIENTS_URL = `${BASE_URL}/ingredients`;
const RECIPES_URL = `${BASE_URL}/recipes`;

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await fetch(RECIPES_URL);
    if (!response.ok) {
      throw new Error("Something went wrong when getting recipes");
    }
    const data = await response.json();
    return data;
  }
);
//TODO create extra reducers

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    isLoading: false,
    formMode: "",
    error: null,
    selectedRecipe: null,
  },
  //TODO add reducers
  reducers: {},
  //TODO add extra reducers
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.recipes = [];
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.isLoading = false;
    });
  },
});

// export const { } = recipeSlice.actions;
export default recipeSlice.reducer;
