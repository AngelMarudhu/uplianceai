import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },

    loginSuccess: (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;

      localStorage.setItem("isLoggedIn", true);
    },

    loginFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("users");
      localStorage.removeItem("editContent");
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
