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
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to create account.";
      return rejectWithValue(message);
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
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to login.";
      return rejectWithValue(message);
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
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to verify authentication.";
    return rejectWithValue(message);
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to logout.";
    return rejectWithValue(message);
  }
});

type CreateUserFulfilledAction = ReturnType<typeof createUser.fulfilled>;
type CreateUserRejectedAction = ReturnType<typeof createUser.rejected>;
type LoginFulfilledAction = ReturnType<typeof login.fulfilled>;
type LoginRejectedAction = ReturnType<typeof login.rejected>;
type IsLoggedInFulfilledAction = ReturnType<typeof isLoggedin.fulfilled>;
type IsLoggedInRejectedAction = ReturnType<typeof isLoggedin.rejected>;
type LogoutFulfilledAction = ReturnType<typeof logout.fulfilled>;
type LogoutRejectedAction = ReturnType<typeof logout.rejected>;

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthType(state, action: PayloadAction<AuthType>) {
      state.authType = action.payload;
      state.error = "";
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        createUser.fulfilled,
        (state, action: CreateUserFulfilledAction) => {
          state.status = "success";
          state.isAuthenticated = true;
          state.userId = action.payload?.data?.user?.userId ?? "";
        }
      )
      .addCase(
        createUser.rejected,
        (state, action: CreateUserRejectedAction) => {
          state.status = "fail";
          state.error =
            action.payload ??
            action.error?.message ??
            "Failed to create account.";
        }
      )
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action: LoginFulfilledAction) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = true;
        state.userId = action.payload?.data?.user?.userId ?? "";
      })
      .addCase(login.rejected, (state, action: LoginRejectedAction) => {
        state.status = "fail";
        state.error =
          action.payload ?? action.error?.message ?? "Failed to login.";
      })
      .addCase(isLoggedin.pending, (state) => {
        state.error = "";
        if (state.status === "loading") {
          return;
        }
      })
      .addCase(
        isLoggedin.fulfilled,
        (state, action: IsLoggedInFulfilledAction) => {
          state.status = action.payload?.status || "success";
          state.isAuthenticated = true;
          state.userId = action.payload?.data?.user?.userId ?? "";
        }
      )
      .addCase(
        isLoggedin.rejected,
        (state, action: IsLoggedInRejectedAction) => {
          state.status = "";
          if (action.payload?.startsWith("You are not logged in.")) {
            state.error = "";
          } else {
            state.error =
              action.payload ??
              action.error?.message ??
              "Authentication check failed.";
          }
        }
      )
      .addCase(logout.pending, (state) => {
        state.error = "";
      })
      .addCase(logout.fulfilled, (state, action: LogoutFulfilledAction) => {
        state.status = action.payload?.status || "success";
        state.isAuthenticated = false;
        state.userId = "";
        state.error = "";
        state.authType = "login";
      })
      .addCase(logout.rejected, (state, action: LogoutRejectedAction) => {
        state.status = "fail";
        state.error =
          action.payload ?? action.error?.message ?? "Failed to logout.";
      });
  },
});

export const { setAuthType } = authenticationSlice.actions;

export default authenticationSlice.reducer;
