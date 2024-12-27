import { RootState } from "../store";

export const selectError = (state: RootState) => {
  return state.auth.error;
};
