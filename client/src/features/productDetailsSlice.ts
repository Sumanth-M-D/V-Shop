import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config";
import apiRequest from "../utils/apiRequest";
import { ProductDetailsState } from "../types/redux.types";
import { Product } from "../types/product.types";

const initialState: ProductDetailsState = {
  productId: null,
  productData: {},
  status: "idle",
  error: "",
  quantity: 1,
};

export const fetchProductDetails = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  "productDetails/fetchData",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${BASE_URL}/products/${id}`, "GET");
      return data.data.product;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setProductId(state, action: PayloadAction<string>) {
      state.productId = action.payload;
    },
    setProductData(state, action: PayloadAction<Product>) {
      state.productData = { ...action.payload };
      state.status = "success";
    },
    updateProductQuantity(state, action: PayloadAction<number>) {
      if (action.payload <= 0) return;
      state.quantity = action.payload;
    },
    resetProductDetails() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.productData = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "fail";
        state.error = (action.payload as string) || action.error?.message || "";
      });
  },
});

export const {
  setProductId,
  setProductData,
  updateProductQuantity,
  resetProductDetails,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
