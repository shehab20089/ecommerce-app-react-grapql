import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrenciesService } from "../../services";

const initialState = {
  currencies: [],
  selectedCurrency: "",
};

export const currenciesSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCurrenciesAsync.fulfilled, (state, action) => {
      state.currencies = action.payload;
      state.selectedCurrency = action.payload ? action.payload[0].id : "";
    });
  },
});

export const fetchCurrenciesAsync = createAsyncThunk(
  "currencies/fetchCurrencies",
  async () => {
    const response = await CurrenciesService.getCurrencies();
    return response.data.currencies;
  }
);
export const { changeCurrency } = currenciesSlice.actions;
export default currenciesSlice.reducer;
