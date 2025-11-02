import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config";
import apiRequest from "../utils/apiRequest";

const initialState = {
  productId: null,
  productData: {},
  status: "idle",
  error: "",
  quantity: 1,
};

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchData",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${BASE_URL}/products/${id}`, "GET");
      return data.data.product;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setProductId(state, action) {
      state.productId = action.payload;
    },
    setProductData(state, action) {
      state.productData = { ...action.payload };
      state.status = "success";
    },
    updateProductQuantity(state, action) {
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
        state.error = action.payload || action.error.message;
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
