import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorServerResponse,
  loginFormData,
  LoginUserResponse,
  registerFormData,
} from "../../types";
import { instance } from "../../service/api";
import axios from "axios";

export const registerUser = createAsyncThunk<
  LoginUserResponse,
  registerFormData,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("auth/login", async (registerData, { rejectWithValue }) => {
  try {
    registerData = {
      ...registerData,
      theme: "dark",
    };
    const { data } = await instance.post("/auth/register", registerData);
    const { name, email, avatar, theme } = data.data;
    const user = {
      name,
      email,
      avatar,
      theme,
    };

    const response = await instance.post("/auth/login", {
      email: registerData.email,
      password: registerData.password,
    });
    const accessToken = response.data.data.accessToken;

    return { user, accessToken };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue(err.response.data);
    }

    throw err;
  }
});

export const loginUser = createAsyncThunk<
  LoginUserResponse,
  loginFormData,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await instance.post("auth/login", loginData);
    const { user, accessToken } = data.data;
    return { user, accessToken };
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response) {
      return rejectWithValue(err.response.data);
    }

    throw err;
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await instance.post("/auth/logout");
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response) {
      return rejectWithValue(err.response.data);
    }

    throw err;
  }
});
