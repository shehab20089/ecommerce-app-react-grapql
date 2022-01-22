import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "idle",
  numberOfRequestsIsLoading: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeAppNumberIsLoading: (state, action) => {
      state.numberOfRequestsIsLoading += action.payload;
      if (state.numberOfRequestsIsLoading > 0) state.state = "loading";
      else state.state = "idle";
    },
  },
});

export const { changeAppNumberIsLoading } = globalSlice.actions;
export default globalSlice.reducer;
