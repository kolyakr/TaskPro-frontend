import axios from "axios";
import { loginFormData, registerFormData, UpdateUserType } from "../types";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async (payload: registerFormData) => {
  const { data } = await instance.post("/auth/register", payload);
  return data;
};

export const login = async (payload: loginFormData) => {
  const { data } = await instance.post("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await instance.post("/auth/logout");
};

export const refresh = async () => {
  const { data } = await instance.post("/auth/refresh");
  return data;
};

export const fetchUser = async (token: string) => {
  const { data } = await instance.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateProfile = async (
  user: UpdateUserType,
  token: string | null
) => {
  const { data } = await instance.patch("/me/update", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
