import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/boards";
import {
  addCard,
  addColumn,
  createBoard,
  deleteBoard,
  deleteCard,
  deleteColumn,
  editBoard,
  editCard,
  editColumn,
  getBoards,
  moveCard,
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
      })
      .addCase(editColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board.boardId === action.payload.boardId) {
            const updatedColumns = board.columns.map((column) => {
              if (column.columnId === action.payload.columnId) {
                return {
                  columnId: action.payload.columnId,
                  title: action.payload.title,
                  cards: action.payload.cards,
                };
              }

              return column;
            });

            board.columns = updatedColumns;
          }
          return board;
        });
        state.isLoading = false;
      })
      .addCase(editColumn.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to edit column";
        state.isLoading = false;
      })
      .addCase(addCard.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.columnId === action.payload.columnId) {
                column.cards = [...column.cards, action.payload.card];
              }

              return column;
            }),
          };
        });
        state.isLoading = false;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to add card";
        state.isLoading = false;
      })
      .addCase(editCard.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        const { columnId, card } = action.payload;

        state.boards = state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) =>
            column.columnId === columnId
              ? {
                  ...column,
                  cards: column.cards.map((c) =>
                    c.cardId === card.cardId ? { ...c, ...card } : c
                  ),
                }
              : column
          ),
        }));

        state.isLoading = false;
      })
      .addCase(editCard.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to edit card";
        state.isLoading = false;
      })
      .addCase(deleteCard.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          return {
            ...board,
            columns: board.columns.map((column) => {
              return {
                ...column,
                cards: column.cards.filter((card) => {
                  return card.cardId !== action.payload;
                }),
              };
            }),
          };
        });
        state.isLoading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete card";
        state.isLoading = false;
      })
      .addCase(moveCard.pending, (state) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.columnId === action.payload.oldColumnId) {
                return {
                  ...column,
                  cards: column.cards.filter(
                    (card) => card.cardId !== action.payload.card.cardId
                  ),
                };
              }

              if (column.columnId === action.payload.newColumnId) {
                return {
                  ...column,
                  cards: [...column.cards, action.payload.card],
                };
              }

              return column;
            }),
          };
        });
        state.isLoading = false;
      })
      .addCase(moveCard.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to move card";
        state.isLoading = false;
      });
  },
});

export const boardsReducer = slice.reducer;
