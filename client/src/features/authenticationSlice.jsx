import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadCartFromLocalStorage } from "./shoppingCartSlice";
import { loadWishlistFromLocalStorage } from "./wishlistSlice";

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
  async ({ email, password }) => {
    // Save user credentials (email and password) to localStorage
    localStorage.setItem(email, password);
    return email;
  }
);

// Async action to authenticate a user (checks localStorage for email and password)
export const authenticate = createAsyncThunk(
  "authentication/authenticate",
  async ({ email, password }, { dispatch }) => {
    // Retrieve password for the given email from localStorage
    const storedPassword = localStorage.getItem(email);
    let error = "";

    // Handle case when user does not exist
    if (!storedPassword) {
      error = "User does not exist. Please signup";
      return { email, isPasswordCorrect: false, error };
    }

    // Verify if the entered password matches the stored password
    const isPasswordCorrect = storedPassword === password;

    if (isPasswordCorrect) {
      // Load cart and wishlist from localStorage if authentication is successful
      dispatch(loadCartFromLocalStorage(email));
      dispatch(loadWishlistFromLocalStorage(email));
    } else {
      error = "Invalid password. Please try again";
    }

    return { email, isPasswordCorrect, error };
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthType(state, action) {
      state.authType = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = "";
      state.status = "";
    },
  },

  // Handle async actions related to creating a user and authenticating
  extraReducers: (builder) => {
    // Pending, Fulfilled & rejected state handling for createUser async action
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.userId = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.error = "Cannot authenticate the user now. Try again later";
        state.status = "fail";
      })

      // Pending, Fulfilled & rejected state handling for authenticate async action
      .addCase(authenticate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status = "success";
        const { email, isPasswordCorrect, error } = action.payload;
        state.userId = email;
        state.isAuthenticated = isPasswordCorrect;
        if (error.length > 0) {
          state.error = error;
        }
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = "Cannot authenticate the user now. Try again later";
        state.error = action.payload;
        state.status = "fail";
      });
  },
});

// Export actions for use in the application
export const { setAuthType, logout } = authenticationSlice.actions;

// Export reducer for use in the Redux store
export default authenticationSlice.reducer;
