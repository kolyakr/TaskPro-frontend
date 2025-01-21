import { Card } from "./cards";

export interface Column {
  columnId: string;
  title: string;
  cards: Card[];
}

export interface AddAndEditColumnData {
  boardId: string;
  title: string;
}

export interface AddAndEditColumnResponse {
  column: Column;
  boardId: string;
}
