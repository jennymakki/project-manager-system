import axiosClient from "../../../lib/api/axiosClient";

export const getTasksByList = (listId: string) =>
  axiosClient.get(`/lists/${listId}/tasks`);

export const createTask = (listId: string, title: string) =>
  axiosClient.post(`/lists/${listId}/tasks`, {
    title,
    description: "",
  });

export const updateTask = (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    assignedUserId?: string;
    dueDate?: string;
    taskListId?: number;
  }
) => axiosClient.put(`/tasks/${taskId}`, data);

export const deleteTask = (taskId: string) =>
  axiosClient.delete(`/tasks/${taskId}`);