import { RootState } from "../store";

export const selectBoards = (state: RootState) => {
  return state.boards.boards;
};

export const selectIsLoading = (state: RootState) => {
  return state.boards.isLoading;
};

export const selectError = (state: RootState) => {
  return state.boards.error;
};

export const selectBoard =
  (boardId: string | undefined) => (state: RootState) => {
    if (boardId === undefined) {
      return null;
    }

    const boards = state.boards.boards;
    const foundBoard = boards.find((board) => board.boardId === boardId);

    return foundBoard !== undefined ? foundBoard : null;
  };
