export interface loginFormData {
  email: string;
  password: string;
}

export interface registerFormData extends loginFormData {
  name: string;
  theme?: "violet" | "light" | "dark";
}

export interface User {
  name: string | null;
  email: string | null;
  theme: "violet" | "dark" | "light";
  avatar: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ErrorServerResponse {
  status: number | string;
  message: string;
}

export interface LoginUserResponse {
  user: User;
  accessToken: string;
}
