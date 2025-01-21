import axios from "axios";
import { AddAndEditColumnData } from "../types/columns";

const instance = axios.create({
  baseURL: "http://localhost:3000/columns",
  withCredentials: true,
});

export const addColumnService = async (
  payload: AddAndEditColumnData,
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

export const editColumnService = async (
  columnId: string,
  title: string,
  token: string
) => {
  const { data } = await instance.patch(
    `/${columnId}`,
    {
      title: title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
