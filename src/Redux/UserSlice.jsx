import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: JSON.parse(localStorage.getItem("users")) || [],
    unSaved: false,
  },

  reducers: {
    addUser: (state, action) => {
      const newUser = { id: uuidv4(), ...action.payload };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
      state.unSaved = false;
    },
    unSavedChanges: (state, action) => {
      state.unSaved = action.payload;
    },
  },
});

export const { addUser, unSavedChanges } = userSlice.actions;
export default userSlice.reducer;
