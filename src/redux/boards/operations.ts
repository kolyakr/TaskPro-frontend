import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board, CreateBoardData } from "../../types/boards";
import { ErrorServerResponse } from "../../types";
import axios from "axios";
import { RootState } from "../store";
import { createBoardService, getBoardsService } from "../../service/boards";

export const createBoard = createAsyncThunk<
  Board,
  CreateBoardData,
  { rejectValue: ErrorServerResponse | undefined }
>(
  "boards/createBoard",
  async (createBoardData, { rejectWithValue, getState }) => {
    try {
      const store = getState() as RootState;
      const token = store.auth.token;

      if (token === null) {
        throw new Error();
      }

      const { data } = await createBoardService(createBoardData, token);
      const board: Board = {
        title: data.title,
        icon: data.icon,
        background: data.background,
        boardId: data._id,
        columns: [],
      };

      return board;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }

      throw err;
    }
  }
);

export const getBoards = createAsyncThunk<
  Board[],
  void,
  { rejectValue: ErrorServerResponse | undefined }
>("boards/getBoards", async (_, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (token === null) {
      throw new Error();
    }

    const { data } = await getBoardsService(token);
    const boards = data.boards;

    return boards;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});
