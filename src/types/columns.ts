import { Card } from "./cards";

export interface Column {
  columnId: string;
  title: string;
  cards: Card[];
}

export interface AddColumnData {
  boardId: string;
  title: string;
}

export interface AddBoardResponse {
  column: Column;
  boardId: string;
}
