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
        cart: state.cart
          .map((item) => {
            if (item.id == action.payload.id) {
              if (action.payload.quantity < 1) return "deleted";
              return action.payload;
            }
            return item;
          })
          .filter((item) => item != "deleted"),
      };
    },
  },
});

export const { addItemToCart, updateProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
