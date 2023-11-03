import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;
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
export const fetchRecipe = createAsyncThunk(
  "recipes/fetchRecipe",
  async (id) => {
    const response = await fetch(`${RECIPES_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Something went wrong when getting recipe");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    const response = await fetch(`${RECIPES_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Something went wrong when deliting recipe");
    }
    return id;
  }
);

export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ id, ...recipe }) => {
    const response = await fetch(`${RECIPES_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Something went wrong when editing recipe");
    }
    const data = await response.json();
    return { id, ...data };
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe) => {
    const response = await fetch(`${RECIPES_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Something went wrong when adding recipe");
    }
    const data = await response.json();
    return { id: data.id, ...recipe };
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    isLoading: false,
    formMode: "add",
    error: null,
    selectedRecipe: null,
  },
  reducers: {
    setFormMode: (state, action) => {
      state.formMode = action.payload;
      console.log(state.formMode);
    },
    setSelectedProject: (state, action) => {
      state.selectedRecipe = action.payload;
    },
  },
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

    builder.addCase(fetchRecipe.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.selectedRecipe = null;
    });
    builder.addCase(fetchRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchRecipe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedRecipe = action.payload;
    });

    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.recipes.push(action.payload);
    });

    builder.addCase(editRecipe.fulfilled, (state, action) => {
      state.recipes = [
        ...state.recipes.filter((r) => r.id != action.payload.id),
        action.payload,
      ];
    });

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id != action.payload);
    });
  },
});

export const { setFormMode, setSelectedProject } = recipeSlice.actions;
export default recipeSlice.reducer;
