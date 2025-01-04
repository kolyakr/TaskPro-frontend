import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorServerResponse,
  GetUserResponse,
  loginFormData,
  LoginUserResponse,
  registerFormData,
} from "../../types";
import { fetchUser, login, logout, refresh, register } from "../../service/api";
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
    const data = await register(registerData);
    const { name, email, avatar, theme } = data.data;
    const user = {
      name,
      email,
      avatar,
      theme,
    };

    const response = await login({
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
    const data = await login(loginData);
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
    await logout();
  } catch (err) {
    if (axios.isAxiosError(err) && err?.response) {
      return rejectWithValue(err.response.data);
    }

    throw err;
  }
});

export const getUser = createAsyncThunk<
  GetUserResponse,
  string,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("auth/me", async (token, { rejectWithValue }) => {
  try {
    const data = await fetchUser(token);
    return { user: data.data.user, token };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message === "Token is expired") {
        try {
          const refreshResponse = await refresh();
          const accessToken = refreshResponse.data.accessToken;
          const data = await fetchUser(accessToken);
          return { user: data.data.user, token: accessToken };
        } catch (err) {
          if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data || "Refresh failed");
          }

          throw err;
        }
      } else {
        return rejectWithValue(err.response?.data);
      }
    }

    throw err;
  }
});
