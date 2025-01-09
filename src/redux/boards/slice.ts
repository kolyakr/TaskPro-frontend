import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/boards";
import { createBoard, deleteBoard, editBoard, getBoards } from "./operations";

interface BoardsState {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: BoardsState = {
  boards: [],
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
        state.boards = [...state.boards, action.payload];
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create board";
      })
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to get boards";
        state.isLoading = false;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.boardId !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to delete a board";
      })
      .addCase(editBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          return board.boardId === action.payload.boardId
            ? action.payload
            : board;
        });
        state.isLoading = false;
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to edit board";
        state.isLoading = false;
      });
  },
});

export const boardsReducer = slice.reducer;
