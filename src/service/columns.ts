import axios from "axios";
import { AddColumnData } from "../types/columns";

const instance = axios.create({
  baseURL: "http://localhost:3000/columns",
  withCredentials: true,
});

export const addColumnService = async (
  payload: AddColumnData,
  token: string
) => {
  const { data } = await instance.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteColumnService = async (columnId: string, token: string) => {
  await instance.delete(`/${columnId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
