import { RootState } from "../store";

export const selectError = (state: RootState) => {
  return state.auth.error;
};

export const selectUser = (state: RootState) => {
  return state.auth.user;
};

export const selectIsLoading = (state: RootState) => {
  return state.auth.isLoading;
};

export const selectToken = (state: RootState) => {
  return state.auth.token;
};
export const selectIsLoggedIn = (state: RootState) => {
  return state.auth.isLoggedIn;
};
export const selectIsRefreshing = (state: RootState) => {
  return state.auth.isRefreshing;
};
