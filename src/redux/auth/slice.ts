import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";
import {
  getUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "./operations";

const INITIAL_STATE: AuthState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    theme: "dark",
  },
  token: null,
  isLoading: false,
  isRefreshing: false,
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
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.token = action.payload.token;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
        state.isRefreshing = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update profile";
        state.isLoading = false;
      });
  },
});

export const authReducer = slice.reducer;
