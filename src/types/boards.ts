export interface Board {
  boardId: string;
  title: string;
  icon: string;
  background: string;
  columns: Column[];
}
export interface Column {
  columnId: string;
  title: string;
  boards: Card[];
}

export interface Card {
  title: string;
  description: string;
  priority: string;
  deadline: Date;
}

export interface CreateBoardData {
  title: string;
  icon: string;
  background: string;
}
