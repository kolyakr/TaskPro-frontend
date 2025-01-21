import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board, CreateBoardData, EditBoardData } from "../../types/boards";
import { ErrorServerResponse } from "../../types";
import axios from "axios";
import { RootState } from "../store";
import {
  createBoardService,
  deleteBoardService,
  editBoardService,
  getBoardsService,
} from "../../service/boards";
import { AddBoardResponse, AddColumnData } from "../../types/columns";
import { addColumnService, deleteColumnService } from "../../service/columns";

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

export const deleteBoard = createAsyncThunk<
  string,
  string,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("boards/deleteBoard", async (boardId, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    await deleteBoardService(boardId, token);

    return boardId;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});

export const editBoard = createAsyncThunk<
  Board,
  EditBoardData,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("boards/editBoard", async (editBoardData, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    const { data } = await editBoardService(editBoardData, token);
    const board = data.board;

    return board;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});

export const addColumn = createAsyncThunk<
  AddBoardResponse,
  AddColumnData,
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>("boards/addColumn", async (addColumnData, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    const { data } = await addColumnService(addColumnData, token);
    const column = data.column;

    return { column, boardId: addColumnData.boardId };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});

export const deleteColumn = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorServerResponse | undefined }
>("boards/deleteColumn", async (columnId, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    await deleteColumnService(columnId, token);

    return columnId;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});
