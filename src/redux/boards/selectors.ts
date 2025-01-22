import { RootState } from "../store";

export const selectBoards = (state: RootState) => state.boards.boards;

export const selectIsLoading = (state: RootState) => state.boards.isLoading;

export const selectError = (state: RootState) => state.boards.error;

export const selectBoard = (boardId?: string) => (state: RootState) => {
  if (!boardId) return null;
  return state.boards.boards.find((board) => board.boardId === boardId) || null;
};

export const selectColumn =
  (boardId?: string, cardId?: string) => (state: RootState) => {
    if (!boardId || !cardId) return null;
    const board = selectBoard(boardId)(state);
    if (!board) return null;
    return (
      board.columns.find((column) =>
        column.cards.some((card) => card.cardId === cardId)
      ) || null
    );
  };
