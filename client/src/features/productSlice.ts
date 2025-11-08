import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, PRODUCTS_PER_PAGE } from "../config/config";
import apiRequest from "../utils/apiRequest";
import { ProductsState } from "../types/redux.types";
import { Product } from "../types/product.types";
import { PaginationResponse } from "../types/api.types";
import { RootState } from "../store";

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: "",
  currentPage: 1,
  totalPages: 0,
  total: 0,
};

export const fetchProducts = createAsyncThunk<
  { products: Product[]; pagination: PaginationResponse },
  void,
  { state: RootState; rejectValue: string }
>("products/fetchProducts", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const { categories, activeCategoryIndex, searchText } = state.categories;
    const { currentPage } = state.products;

    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: PRODUCTS_PER_PAGE.toString(),
    });

    if (searchText.length > 0) {
      params.append("search", searchText);
    } else {
      const resolvedIndex =
        typeof activeCategoryIndex === "number"
          ? activeCategoryIndex
          : Number.parseInt(activeCategoryIndex, 10);
      const activeCategory =
        Number.isFinite(resolvedIndex) && resolvedIndex >= 0
          ? (categories[resolvedIndex] ?? undefined)
          : undefined;

      if (activeCategory && activeCategory !== "All products") {
        params.append("category", activeCategory);
      }
    }

    const requestUrl = `${BASE_URL}/products?${params.toString()}`;
    const data = await apiRequest<{ products: Product[] }>(requestUrl, "GET");
    const products = data.data?.products ?? [];
    const pagination: PaginationResponse = data.pagination ?? {
      total: products.length,
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
    };

    return {
      products,
      pagination,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch products";
    return rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetCurrentPage(state) {
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.products;
        state.total = action.payload.pagination.total;
        state.totalPages = Math.ceil(
          action.payload.pagination.total / PRODUCTS_PER_PAGE
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "fail";
        state.error = (action.payload as string) || action.error?.message || "";
      });
  },
});

export const { setCurrentPage, resetCurrentPage } = productSlice.actions;

export default productSlice.reducer;
