export type Task = {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  taskListId: number;
  assignedToId?: number;
  dueDate?: string;
};