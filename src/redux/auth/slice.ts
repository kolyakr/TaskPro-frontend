import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";
import { loginUser } from "./operations";

const INITIAL_STATE: AuthState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    theme: "dark",
  },
  token: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

export const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = slice.reducer;
