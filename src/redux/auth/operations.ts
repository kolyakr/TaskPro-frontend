import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorServerResponse, registerFormData, User } from "../../types";
import { instance } from "../../service/api";
import axios from "axios";

export const registerUser = createAsyncThunk<
  User,
  registerFormData,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("auth/register", async (registerData, { rejectWithValue }) => {
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
    return user;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue(err.response.data);
    }

    throw err;
  }
});
