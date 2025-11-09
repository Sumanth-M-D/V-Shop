import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config";
import apiRequest from "../utils/apiRequest";
import { loadCart, resetCart } from "./shoppingCartSlice";
import { loadWishlist, resetWishlist } from "./wishlistSlice";
import { AuthenticationState } from "../types/redux.types";
import { AuthCredentials, AuthType } from "../types/auth.types";
import { ApiResponse, UserData } from "../types/api.types";

const initialState: AuthenticationState = {
  authType: "login",
  isAuthenticated: false,
  userId: "",
  error: "",
  status: "",
};

export const createUser = createAsyncThunk<
  ApiResponse<UserData>,
  AuthCredentials,
  { rejectValue: string }
>(
  "authentication/createUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiRequest(`${BASE_URL}/user/signup`, "POST", {
        email,
        password,
      });
      await dispatch(loadCart());
      await dispatch(loadWishlist());
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk<
  ApiResponse<UserData>,
  AuthCredentials,
  { rejectValue: string }
>(
  "authentication/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiRequest(`${BASE_URL}/user/login`, "POST", {
        email,
        password,
      });
      await dispatch(loadCart());
      await dispatch(loadWishlist());
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const isLoggedin = createAsyncThunk<
  ApiResponse<UserData>,
  void,
  { rejectValue: string }
>("authentication/isLoggedin", async (_, { rejectWithValue, dispatch }) => {
  try {
    const data = await apiRequest(`${BASE_URL}/user/isLoggedin`, "GET");
    await dispatch(loadCart());
    await dispatch(loadWishlist());
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: string }
>("authentication/logout", async (_, { rejectWithValue, dispatch }) => {
  try {
    const data = await apiRequest(`${BASE_URL}/user/logout`, "POST");
    dispatch(resetCart());
    dispatch(resetWishlist());
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthType(state, action: PayloadAction<AuthType>) {
      state.authType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?.userId ?? "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?.userId ?? "";
      })
      .addCase(isLoggedin.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?.userId ?? "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        state.status = "success";
        state.isAuthenticated = false;
        state.userId = "";
        state.error = "";
        state.authType = "login";
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
        (state, action: any) => {
          state.status = "fail";
          if (action.payload?.startsWith("You are not logged in.")) {
            state.error = "";
          } else {
            state.error = action.payload || action.error?.message || "";
          }
        }
      );
  },
});

export const { setAuthType } = authenticationSlice.actions;

export default authenticationSlice.reducer;
