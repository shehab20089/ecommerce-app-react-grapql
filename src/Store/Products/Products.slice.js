import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsService } from "../../services";

const initialState = {
  products: [],
  selectedProduct: {},
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategoryAsync.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProductsByCategoryAsync.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const fetchProductsByCategoryAsync = createAsyncThunk(
  "products/fetchProducts",
  async (category) => {
    const response = await ProductsService.getProductsByCategory(category);
    return response.data.category.products;
  }
);
export default productsSlice.reducer;
