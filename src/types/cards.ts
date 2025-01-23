import { Priority } from ".";

export interface Card {
  cardId: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: Date;
}

export interface AddCardData {
  title: string;
  description: string;
  priority: Priority;
  deadline: Date;
  columnId: string;
}

export interface EditCardData {
  title?: string;
  description?: string;
  priority?: Priority;
  deadline?: Date;
  columnId?: string;
}

export interface DeleteCardData {
  cardId: string;
}
