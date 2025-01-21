import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/boards";
import {
  addColumn,
  createBoard,
  deleteBoard,
  deleteColumn,
  editBoard,
  getBoards,
} from "./operations";

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
      })
      .addCase(addColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board.boardId === action.payload.boardId) {
            board.columns = [...board.columns, action.payload.column];
          }

          return board;
        });
        state.isLoading = false;
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to create column";
        state.isLoading = false;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          return {
            ...board,
            columns: board.columns.filter(
              (column) => column.columnId !== action.payload
            ),
          };
        });
        state.isLoading = false;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete column";
        state.isLoading = false;
      });
  },
});

export const boardsReducer = slice.reducer;
