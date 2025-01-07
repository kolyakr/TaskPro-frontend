import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/boards";
import { createBoard } from "./operations";

interface BoardsState {
  board: Board | null;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: BoardsState = {
  board: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "boards",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || null;
      });
  },
});

export const boardsReducer = slice.reducer;
