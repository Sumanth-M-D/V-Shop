import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";
import { BASE_URL } from "../config/config";
import { ShoppingCartState } from "../types/redux.types";
import { AddToCartPayload, CartData } from "../types/cart.types";
import { ApiResponse } from "../types/api.types";

const initialState: ShoppingCartState = {
  cartProducts: [],
  shipping: 0,
  cartId: "",
  error: "",
  status: "",
};

export const loadCart = createAsyncThunk<
  ApiResponse<CartData>,
  void,
  { rejectValue: string }
>("shoppingCart/loadCart", async (_, { rejectWithValue }) => {
  try {
    return await apiRequest<CartData>(`${BASE_URL}/cart`, "GET");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load cart";
    return rejectWithValue(message);
  }
});

export const addProductToCart = createAsyncThunk<
  ApiResponse<CartData>,
  AddToCartPayload,
  { rejectValue: string }
>(
  "shoppingCart/addProductToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await apiRequest<CartData>(`${BASE_URL}/cart/`, "POST", {
        productId,
        quantity,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add product to cart";
      return rejectWithValue(message);
    }
  }
);

export const removeProduct = createAsyncThunk<
  ApiResponse<CartData>,
  string,
  { rejectValue: string }
>("shoppingCart/removeProduct", async (productId, { rejectWithValue }) => {
  try {
    return await apiRequest<CartData>(`${BASE_URL}/cart/`, "DELETE", {
      productId,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to remove product";
    return rejectWithValue(message);
  }
});

export const updateProductQuantity = createAsyncThunk<
  ApiResponse<CartData>,
  AddToCartPayload,
  { rejectValue: string }
>(
  "shoppingCart/updateProductQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await apiRequest<CartData>(`${BASE_URL}/cart/`, "PATCH", {
        productId,
        quantity,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update quantity";
      return rejectWithValue(message);
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    updateShipping(state, action: PayloadAction<number>) {
      state.shipping = action.payload;
    },
    resetCart(state) {
      state.cartProducts = initialState.cartProducts;
      state.shipping = initialState.shipping;
      state.cartId = initialState.cartId;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.fulfilled, (state, action) => {
        state.status = "success";
        const cart = action.payload?.data?.cart;
        state.cartId = cart?._id ?? "";
        state.cartProducts = cart?.cartItems ?? [];
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        const cart = action.payload?.data?.cart;
        state.cartProducts = cart?.cartItems ?? [];
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        const cart = action.payload?.data?.cart;
        state.cartProducts = cart?.cartItems ?? [];
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.status = action.payload?.status || "success";
        const cart = action.payload?.data?.cart;
        state.cartProducts = [...(cart?.cartItems ?? [])];
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

export const { updateShipping, resetCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
