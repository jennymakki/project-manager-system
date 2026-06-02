import type { Task } from "./task";

export type List = {
  id: number;
  name: string;
  boardId: number;
  tasks: Task[];
};