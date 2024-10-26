import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config.js";
import apiRequest from "../utils/apiRequest.js";

const initialState = {
  categories: [],
  activeCategoryIndex: "", // Tracks the currently active category (by index)
  status: "idle", // idle | loading | success | fail
  error: "",
};

// Async action to fetch categories from the API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(
        `${BASE_URL}/products/categories`,
        "GET",
        null,
        true
      );
      const categories = data.data.categories;

      // Return categories with "All products" added as the first category
      return ["All products", ...categories];
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
        state.error = action.payload || action.error.message;
      });
  },
});

export const { updateActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
