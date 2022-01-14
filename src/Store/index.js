import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Categories/categories.slice";
import productsReducer from "./Products/Products.slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});
