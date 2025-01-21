import { Priority } from ".";

export interface Card {
  cardId: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: Date;
}
