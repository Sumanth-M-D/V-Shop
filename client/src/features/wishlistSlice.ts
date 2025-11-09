import { createAsyncThunk, createSlice, AnyAction } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { BASE_URL } from "../config/config";
import { WishlistState } from "../types/redux.types";
import { AddToWishlistPayload, WishlistData } from "../types/cart.types";
import { ApiResponse } from "../types/api.types";

const initialState: WishlistState = {
  wishlistProducts: [],
  wishlistId: "",
  error: "",
  status: "",
};

export const loadWishlist = createAsyncThunk<
  ApiResponse<WishlistData>,
  void,
  { rejectValue: string }
>("wishlist/loadWishlist", async (_, { rejectWithValue }) => {
  try {
    return await apiRequest<WishlistData>(`${BASE_URL}/wishlist`, "GET");
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load wishlist";
    return rejectWithValue(message);
  }
});

export const addProductToWishlist = createAsyncThunk<
  ApiResponse<WishlistData>,
  AddToWishlistPayload,
  { rejectValue: string }
>(
  "wishlist/addProductToWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      return await apiRequest<WishlistData>(`${BASE_URL}/wishlist/`, "POST", {
        productId,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to add product to wishlist";
      return rejectWithValue(message);
    }
  }
);

export const removeProduct = createAsyncThunk<
  ApiResponse<WishlistData>,
  string,
  { rejectValue: string }
>("wishlist/removeProduct", async (productId, { rejectWithValue }) => {
  try {
    return await apiRequest<WishlistData>(`${BASE_URL}/wishlist/`, "DELETE", {
      productId,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to remove product";
    return rejectWithValue(message);
  }
});

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    resetWishlist(state) {
      state.wishlistProducts = initialState.wishlistProducts;
      state.wishlistId = initialState.wishlistId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.status = "success";
        const wishlistItems = action.payload?.data?.wishlist ?? [];
        state.wishlistProducts = wishlistItems;
        const wishlistId = action.payload?.data?.wishlistId;
        if (typeof wishlistId === "string") {
          state.wishlistId = wishlistId;
        }
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        const wishlistItems = action.payload?.data?.wishlist ?? [];
        state.wishlistProducts = wishlistItems;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        const wishlistItems = action.payload?.data?.wishlist ?? [];
        state.wishlistProducts = wishlistItems;
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
        (state, action: AnyAction) => {
          state.status = "fail";
          const message =
            typeof action.payload === "string"
              ? action.payload
              : action.error?.message || "";
          state.error = message;
        }
      );
  },
});

export const { resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
