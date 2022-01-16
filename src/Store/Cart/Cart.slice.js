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
      return {
        cart: state.cart.map((item) => {
          if (item.id == action.payload.id) return action.payload;
          return item;
        }),
      };
    },
  },
});

export const { addItemToCart, updateProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
