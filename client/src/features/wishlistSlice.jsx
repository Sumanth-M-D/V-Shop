import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { BASE_URL } from "../config/config";

const initialState = {
  wishlistProducts: [],
  wishlistId: "",
  error: "",
  status: "",
};

export const loadWishlist = createAsyncThunk(
  "wishlist/loadWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest(`${BASE_URL}/wishlist/`, "GET", null, true);
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
      return await apiRequest(
        `${BASE_URL}/wishlist/`,
        "POST",
        { productId },
        true
      );
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
      return await apiRequest(
        `${BASE_URL}/wishlist/`,
        "DELETE",
        { productId },
        true,
        rejectWithValue
      );
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
  extraReducers: (builder) => {
    // Pending, Fulfilled & rejected state handling for createUser async action
    builder
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.status = "success";
        state.wishlistId = action.payload?.data?.wishlist?._id;
        state.wishlistProducts = action.payload?.data?.wishlist?.wishlistItems;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.wishlistProducts = action.payload?.data?.wishlist?.wishlistItems;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.wishlistProducts = action.payload?.data?.wishlist?.wishlistItems;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "fail";
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
