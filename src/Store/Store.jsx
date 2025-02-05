import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../Redux/CounterSlice.jsx";
import userSlice from "../Redux/UserSlice.jsx";
import loginslice from "../Redux/LoginSlice.jsx";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: userSlice,
    login: loginslice,
  },
});
