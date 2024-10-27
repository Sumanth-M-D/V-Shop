import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config.js";
import apiRequest from "../utils/apiRequest.js";
import { loadCart, resetCart } from "./shoppingCartSlice.jsx";
import { loadWishlist, resetWishlist } from "./wishlistSlice.jsx";

const initialState = {
  authType: "login",
  isAuthenticated: false,
  userId: "",
  error: "",
  status: "", // loading | success | fail
};

// Async action to create a user (for authentication using localStorage)
export const createUser = createAsyncThunk(
  "authentication/createUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiRequest(
        `${BASE_URL}/user/signup`,
        "POST",
        { email, password },
        false
      );

      // Load cart and wishlist after successful sign-up
      await dispatch(loadCart());
      await dispatch(loadWishlist());
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async action to login a user
export const login = createAsyncThunk(
  "authentication/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiRequest(
        `${BASE_URL}/user/login`,
        "POST",
        { email, password },
        true
      );
      // Load cart and wishlist after successful login
      await dispatch(loadCart());
      await dispatch(loadWishlist());
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Check if user is logged in (e.g., on page load and reload)
export const isLoggedin = createAsyncThunk(
  "authentication/isLoggedin",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiRequest(
        `${BASE_URL}/user/isLoggedin`,
        "GET",
        null,
        true
      );

      // Load cart and wishlist if user is logged in
      await dispatch(loadCart());
      await dispatch(loadWishlist());
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiRequest(
        `${BASE_URL}/user/logout`,
        "POST",
        null,
        true
      );

      // Reset cart and wishlist after successful logout
      dispatch(resetCart());
      dispatch(resetWishlist());
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create a slice for authentication with initial state, reducers, and extra reducers for async actions
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    // Reducer to set the auth type (e.g., "login" or "signup")
    setAuthType(state, action) {
      state.authType = action.payload;
    },
  },

  // Handle async actions related to creating a user and authenticating
  extraReducers: (builder) => {
    builder
      // Handles the fulfilled state for the createUser action
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?._id;
      })

      // Handles the fulfilled state for the login action
      .addCase(login.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?._id;
      })

      // Handles the fulfilled state for the isLoggedin action
      .addCase(isLoggedin.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?._id;
      })

      // Handles the fulfilled state for the logout action
      .addCase(logout.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.status = "success";
        state.isAuthenticated = false;
        state.userId = "";
        state.error = "";
        state.authType = "login"; // Reset to initial authType if needed
      })

      // General matcher for pending state of any async action (sets status to loading)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = "";
        }
      )

      // General matcher for rejected state of any async action (sets status to fail)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "fail";
          if (action.payload.startsWith("You are not logged in.")) {
            state.error = "";
          } else {
            state.error = action.payload || action.error.message;
          }
        }
      );
  },
});

// Export actions for use in the application
export const { setAuthType } = authenticationSlice.actions;

// Export reducer for use in the Redux store
export default authenticationSlice.reducer;
