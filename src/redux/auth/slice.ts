import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";
import { registerUser } from "./operations";

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
};

export const slice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || null;
      });
  },
});

export const authReducer = slice.reducer;
