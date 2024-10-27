import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config.js";
import apiRequest from "../utils/apiRequest.js";

// Initial state for the category slice
const initialState = {
  categories: [], // Array to hold fetched categories
  activeCategoryIndex: 0, // Tracks the currently active category (by index)
  status: "idle", // idle | loading | success | fail
  error: "",
  searchText: "",
};

// Async action to fetch product categories from the API
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

// Slice to manage categories, including reducers and extra reducers for async actions
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Reducer to update the active category based on user selection
    updateActiveCategory(state, action) {
      state.activeCategoryIndex = action.payload;
      if (action.payload !== "" && Number(action.payload) !== 0) {
        state.searchText = "";
      }
    },
    // Setting the search text
    setSearchText(state, action) {
      state.searchText = action.payload;
      state.activeCategoryIndex = "";
    },
  },

  // Handling of async actions => Pending | fullfilled |rejected states for category fetching
  extraReducers: (builder) => {
    builder
      // Set status to "loading" when fetchCategories action is pending
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      // Set status to "success" and update categories with fetched data on fulfilled action
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      // Set status to "fail" and log error if fetchCategories action is rejected
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload || action.error.message;
      });
  },
});

// Export the action to update active category for use in components
export const { updateActiveCategory, setSearchText } = categorySlice.actions;

// Export the category reducer to integrate with the Redux store
export default categorySlice.reducer;
