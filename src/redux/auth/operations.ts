import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorServerResponse,
  GetUserResponse,
  loginFormData,
  LoginUserResponse,
  registerFormData,
  UpdateUserType,
  User,
} from "../../types";
import {
  fetchUser,
  login,
  logout,
  refresh,
  register,
  updateProfile,
} from "../../service/api";
import axios from "axios";
import { RootState } from "../store";

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
    const registerResponse = await register(registerData);

    const response = await login({
      email: registerResponse.data.email,
      password: registerData.password,
    });

    console.log("after login: ", response);

    return { user: response.data.user, accessToken: response.data.accessToken };
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

export const updateUserProfile = createAsyncThunk<
  User,
  UpdateUserType,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("auth/updateUserProfile", async (userData, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const token = state.auth.token;

    const updatedUser = await updateProfile(userData, token);

    return updatedUser.data.user;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});
