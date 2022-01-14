import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesService } from "../../services";

const initialState = {
  categories: [],
  selectedCategory: "",
  status: "idle",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
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
