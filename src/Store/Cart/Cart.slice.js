import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsService } from "../../services";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    updateProductInCart(state, action) {
      let productIndex = state.cart.find((p) => p.id == action.payload.id);
      if (productIndex) {
        state.cart[productIndex] = action.payload;
        return;
      }
    },
  },
});

export const { addItemToCart, updateProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
