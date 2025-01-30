import axios from "axios";
import { CreateBoardData, EditBoardData } from "../types/boards";
import { Priority } from "../types";

const instance = axios.create({
  baseURL: "https://taskpro-backend-uvko.onrender.com/boards",
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

export const getBoardsService = async (
  priority: Priority | undefined,
  token: string
) => {
  const url = priority !== undefined ? `?priority=${priority}` : "/";
  const { data } = await instance.get(url, {
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

export const editBoardService = async (
  editBoardData: EditBoardData,
  token: string
) => {
  const { boardId, ...payload } = editBoardData;
  const { data } = await instance.patch(`/${boardId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
