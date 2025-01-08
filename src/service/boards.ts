import axios from "axios";
import { CreateBoardData } from "../types/boards";

const instance = axios.create({
  baseURL: "http://localhost:3000/boards",
  withCredentials: true,
});

export const createBoardService = async (
  payload: CreateBoardData,
  token: string
) => {
  const { data } = await instance.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getBoardsService = async (token: string) => {
  const { data } = await instance.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteBoardService = async (boardId: string, token: string) => {
  const { data } = await instance.delete(`/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
