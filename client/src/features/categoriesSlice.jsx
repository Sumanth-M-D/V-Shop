import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config.js";

const initialState = {
  categories: [],
  activeCategoryIndex: "", // Tracks the currently active category (by index)
  status: "idle", // idle | loading | success | fail
  error: "",
};

// Async action to fetch categories from the API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    console.log(data);

    // Return categories with "All products" added as the first category
    return ["All products", ...data];
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Reducer to update the active category based on user selection
    updateActiveCategory(state, action) {
      state.activeCategoryIndex = action.payload;
    },
  },

  // Handling of async actions => Pending | fullfilled |rejected states for category fetching
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "fail";
        state.error = "Unable to load categories. Please try again later";
      });
  },
});

export const { updateActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
