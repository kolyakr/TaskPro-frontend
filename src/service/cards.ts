import axios from "axios";
import { AddCardData, EditCardData } from "../types/cards";

const instance = axios.create({
  baseURL: "http://localhost:3000/cards",
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
