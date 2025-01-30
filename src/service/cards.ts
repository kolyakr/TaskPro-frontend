import axios from "axios";
import { AddCardData, DeleteCardData, EditCardData } from "../types/cards";

const instance = axios.create({
  baseURL: "https://taskpro-backend-uvko.onrender.com/cards",
  withCredentials: true,
});

export const addCardService = async (payload: AddCardData, token: string) => {
  const { data } = await instance.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const editCardService = async (
  cardId: string,
  payload: EditCardData,
  token: string
) => {
  const { data } = await instance.patch(`/${cardId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteCardService = async (
  payload: DeleteCardData,
  token: string
) => {
  await instance.delete(`/${payload.cardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
