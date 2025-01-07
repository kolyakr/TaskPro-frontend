import { RootState } from "../store";

export const selectBoard = (state: RootState) => {
  return state.boards.board;
};

export const selectIsLoading = (state: RootState) => {
  return state.boards.isLoading;
};

export const selectError = (state: RootState) => {
  return state.boards.error;
};
