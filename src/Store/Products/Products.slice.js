import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsService } from "../../services";

const initialState = {
  products: [],
  selectedProduct: {
    id: "",
    name: "",
    gallery: [],
    prices: [],
    brand: "",
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategoryAsync.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductByIdAsync.rejected, (state, action) => {
      console.log(action.payload);
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
export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await ProductsService.getProductsById(productId);
    return response.data.product;
  }
);
export default productsSlice.reducer;
