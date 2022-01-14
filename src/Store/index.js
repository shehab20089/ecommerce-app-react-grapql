import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Categories/categories.slice";
import productsReducer from "./Products/Products.slice";
import currenciesReducer from "./Currency/Currency.slice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    currencies: currenciesReducer,
  },
});
