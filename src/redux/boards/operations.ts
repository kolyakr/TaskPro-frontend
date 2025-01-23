import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board, CreateBoardData, EditBoardData } from "../../types/boards";
import { ErrorServerResponse, Priority } from "../../types";
import axios from "axios";
import { RootState } from "../store";
import {
  createBoardService,
  deleteBoardService,
  editBoardService,
  getBoardsService,
} from "../../service/boards";
import {
  AddAndEditColumnData,
  AddAndEditColumnResponse,
  Column,
} from "../../types/columns";
import {
  addColumnService,
  deleteColumnService,
  editColumnService,
} from "../../service/columns";
import {
  AddCardData,
  Card,
  DeleteCardData,
  EditCardData,
} from "../../types/cards";
import {
  addCardService,
  deleteCardService,
  editCardService,
} from "../../service/cards";

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
  {
    priority?: Priority;
  } | void,
  { rejectValue: ErrorServerResponse | undefined }
>("boards/getBoards", async (getBoardsData, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (token === null) {
      throw new Error();
    }

    const { data } = await getBoardsService(getBoardsData?.priority, token);
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
  AddAndEditColumnResponse,
  AddAndEditColumnData,
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

export const editColumn = createAsyncThunk<
  Column & { boardId: string },
  AddAndEditColumnData & { columnId: string },
  {
    rejectValue: ErrorServerResponse | undefined;
  }
>(
  "boards/editColumn",
  async (editColumnData, { rejectWithValue, getState }) => {
    try {
      const store = getState() as RootState;
      const token = store.auth.token;

      if (!token) {
        throw new Error();
      }

      const { data } = await editColumnService(
        editColumnData.columnId,
        editColumnData.title,
        token
      );
      const column = data.column;

      return { ...column, boardId: editColumnData.boardId };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }

      throw err;
    }
  }
);

export const addCard = createAsyncThunk<
  { card: Card; columnId: string },
  AddCardData,
  { rejectValue: ErrorServerResponse | undefined }
>("boards/addCard", async (addCardData, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    const { data } = await addCardService(addCardData, token);
    const card = data.card;

    return {
      card: card,
      columnId: addCardData.columnId,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});

export const editCard = createAsyncThunk<
  { card: Card; columnId: string },
  { cardData: EditCardData; cardId: string },
  { rejectValue: ErrorServerResponse | undefined }
>("boards/editCard", async (payload, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    const { data } = await editCardService(
      payload.cardId,
      payload.cardData,
      token
    );
    const card = data.card;

    const response = {
      card: card,
      columnId: payload.cardData.columnId ?? "",
    };
    console.log(response);

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});

export const deleteCard = createAsyncThunk<
  string,
  DeleteCardData,
  { rejectValue: ErrorServerResponse | undefined }
>(
  "boards/deleteCard",
  async (deleteCardData, { rejectWithValue, getState }) => {
    try {
      const store = getState() as RootState;
      const token = store.auth.token;

      if (!token) {
        throw new Error();
      }

      await deleteCardService(deleteCardData, token);

      return deleteCardData.cardId;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }

      throw err;
    }
  }
);

export const moveCard = createAsyncThunk<
  { card: Card; oldColumnId: string; newColumnId: string },
  { cardData: EditCardData; cardId: string; oldColumnId: string },
  { rejectValue: ErrorServerResponse | undefined }
>("boards/moveCard", async (payload, { rejectWithValue, getState }) => {
  try {
    const store = getState() as RootState;
    const token = store.auth.token;

    if (!token) {
      throw new Error();
    }

    const { data } = await editCardService(
      payload.cardId,
      payload.cardData,
      token
    );
    const card = data.card;

    return {
      card: card,
      newColumnId: payload.cardData.columnId ?? "",
      oldColumnId: payload.oldColumnId,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data);
    }

    throw err;
  }
});
