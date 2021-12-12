import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: (localStorage?.token && JSON.parse(localStorage.token)) || undefined,
  info: undefined,
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = undefined;
      state.info = undefined;
      localStorage.removeItem("token");
      return state;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const getInfoUser = (state) => state.auth.info;
export const { logout, updateUser, updateToken } = authSlice.actions;

export default authSlice.reducer;
