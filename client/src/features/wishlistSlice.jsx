import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { BASE_URL } from "../config/config";

// Initial state for the wishlist slice
const initialState = {
  wishlistProducts: [], // Array to store the products in the wishlist
  wishlistId: "", // Unique identifier for the wishlist
  error: "", // Stores any error message related to wishlist actions
  status: "", // Tracks request status: "idle" | "loading" | "success" | "fail"
};

// Async action to load wishlist items for the current user from the API
export const loadWishlist = createAsyncThunk(
  "wishlist/loadWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest(`${BASE_URL}/wishlist`, "GET");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Action to add a product to the wishlist
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      return await apiRequest(`${BASE_URL}/wishlist/`, "POST", { productId });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Action to remove a product from the wishlist
export const removeProduct = createAsyncThunk(
  "wishlist/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await apiRequest(`${BASE_URL}/wishlist/`, "DELETE", { productId });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create a slice for the wishlist
const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    // Action to load wishlist products from localStorage based on user ID
    resetWishlist(state) {
      state.wishlistProducts = initialState.wishlistProducts;
      state.wishlistId = initialState.wishlistId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },

  // Handles async actions for wishlist operations
  extraReducers: (builder) => {
    builder
      // Sets wishlist data and ID when the loadWishlist action is fulfilled
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.status = "success";
        state.wishlistId = action.payload?.data?.wishlist?._id;
        state.wishlistProducts = action.payload?.data?.wishlist?.wishlistItems;
      })

      // Updates wishlist products after successfully adding a product
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.wishlistProducts = action.payload?.data?.wishlist?.wishlistItems;
      })

      // Updates wishlist products after successfully removing a product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.wishlistProducts = action.payload?.data?.wishlist?.wishlistItems;
      })

      // Sets loading status and clears error message when the loadWishlist action is pending or rejected
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = "";
        }
      )

      // Sets error message when the loadWishlist action is rejected or failed
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "fail";
          state.error = action.payload || action.error.message;
        }
      );
  },
});

// Export the resetWishlist action to allow resetting wishlist data in the app
export const { resetWishlist } = wishlistSlice.actions;

// Export the actions and reducer for the wishlist slice
export default wishlistSlice.reducer;
