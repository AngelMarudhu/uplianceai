import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: Number(localStorage.getItem("count")) || 0,
  },

  reducers: {
    increament: (state) => {
      state.value = state.value + 1;
      localStorage.setItem("count", state.value);
    },
    decrement: (state) => {
      state.value -= 1;
      localStorage.setItem("count", state.value);
    },
    reset: (state) => {
      state.value = 0;
      localStorage.setItem("count", state.value);
    },
  },
});

export const { increament, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
