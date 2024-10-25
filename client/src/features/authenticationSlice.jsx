import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config.js";
import apiRequest from "../utils/apiRequset.js";

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
  async ({ email, password }, { rejectWithValue }) => {
    return await apiRequest(
      `${BASE_URL}/user/signup`,
      "POST",
      { email, password },
      false,
      rejectWithValue
    );
  }
);

// Async action to authenticate a user
export const authenticate = createAsyncThunk(
  "authentication/authenticate",
  async ({ email, password }, { rejectWithValue }) => {
    return apiRequest(
      `${BASE_URL}/user/login`,
      "POST",
      { email, password },
      true,
      rejectWithValue
    );
  }
);

export const isLoggedin = createAsyncThunk(
  "authentication/isLoggedin",
  async (_, { rejectWithValue }) => {
    return apiRequest(
      `${BASE_URL}/user/isLoggedin`,
      "GET",
      null,
      true,
      rejectWithValue
    );
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async (_, { rejectWithValue }) => {
    return apiRequest(
      `${BASE_URL}/user/logout`,
      "POST",
      null,
      true,
      rejectWithValue
    );
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthType(state, action) {
      state.authType = action.payload;
    },
  },

  // Handle async actions related to creating a user and authenticating
  extraReducers: (builder) => {
    // Pending, Fulfilled & rejected state handling for createUser async action
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?._id;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?._id;
      })
      .addCase(isLoggedin.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?._id;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.status = "success";
        state.isAuthenticated = false;
        state.userId = "";
        state.error = "";
        state.authType = "login"; // Reset to initial authType if needed
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
          state.error = action.payload?.message || action.error.message;
        }
      );
  },
});

// Export actions for use in the application
export const { setAuthType } = authenticationSlice.actions;

// Export reducer for use in the Redux store
export default authenticationSlice.reducer;
