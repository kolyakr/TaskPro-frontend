import axios from "axios";
import { loginFormData, registerFormData } from "../types";
import { NeedHelpData } from "../components/NeedHelp/NeedHelp";

export const instance = axios.create({
  baseURL: "https://taskpro-backend-uvko.onrender.com",
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

export const updateProfile = async (body: FormData, token: string | null) => {
  const { data } = await instance.patch("/me/update", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const sendNeedHelpEmail = async (
  payload: NeedHelpData,
  token: string
) => {
  return await instance.post("/send-need-help-email", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
