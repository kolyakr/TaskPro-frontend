import axios from "axios";
import { AddCardData } from "../types/cards";

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
