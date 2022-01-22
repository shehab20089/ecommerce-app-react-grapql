import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesService } from "../../services";

const initialState = {
  categories: [],
  selectedCategory: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {})
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.selectedCategory = action.payload ? action.payload[0].name : "";
      });
  },
});

export const fetchCategoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async (amount) => {
    const response = await CategoriesService.getCategories(amount);
    return response.data.categories;
  }
);
export const { selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
