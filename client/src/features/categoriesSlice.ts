import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/config";
import apiRequest from "../utils/apiRequest";
import { CategoriesState } from "../types/redux.types";

const initialState: CategoriesState = {
  categories: [],
  activeCategoryIndex: 0,
  status: "idle",
  error: "",
  searchText: "",
};

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${BASE_URL}/categories`, "GET");
      const categoriesFromServer = data.data.categories;
      const categories = categoriesFromServer.map(
        (category: any) => category.formattedName
      );
      return ["All products", ...categories];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateActiveCategory(state, action: PayloadAction<number | string>) {
      state.activeCategoryIndex = action.payload;
      if (action.payload !== "" && Number(action.payload) !== 0) {
        state.searchText = "";
      }
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
      state.activeCategoryIndex = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "fail";
        state.error = (action.payload as string) || action.error?.message || "";
      });
  },
});

export const { updateActiveCategory, setSearchText } = categorySlice.actions;

export default categorySlice.reducer;
