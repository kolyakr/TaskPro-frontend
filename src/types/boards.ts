import { Column } from "./columns";

export interface Board {
  boardId: string;
  title: string;
  icon: string;
  background: string;
  columns: Column[];
}

export interface CreateBoardData {
  title: string | undefined;
  icon: string | undefined;
  background: string | undefined;
}

export interface EditBoardData {
  title?: string;
  icon?: string;
  background?: string;
  boardId: string | null;
}
