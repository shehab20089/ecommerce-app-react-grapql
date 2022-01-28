import { createSlice } from "@reduxjs/toolkit";
import { ProductsService } from "../../services";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      state.cart = action.payload;
    },
    addItemToCart: (state, action) => {
      const mappedObj = action.payload;
      mappedObj.id =
        mappedObj.id +
        mappedObj.attributes.reduce((sum, attribute) => {
          return sum + attribute.selectedItem.id;
        }, "");
      const foundIndex = state.cart.findIndex(
        (item) => item.id === mappedObj.id
      );
      if (foundIndex === -1) {
        state.cart.push(mappedObj);
      } else {
        // stack existing products on each other
        state.cart[foundIndex].quantity =
          state.cart[foundIndex].quantity + mappedObj.quantity;
      }
      ProductsService.saveCartProducts(state.cart);
    },
    updateProductInCart(state, action) {
      const mappedCart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.quantity < 1) return "deleted";

            return action.payload;
          }
          return item;
        })
        .filter((item) => item !== "deleted");
      ProductsService.saveCartProducts(mappedCart);

      return {
        cart: mappedCart,
      };
    },
  },
});

export const { addItemToCart, updateProductInCart, fetchCart } =
  cartSlice.actions;

export default cartSlice.reducer;
