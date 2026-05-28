import axiosClient from "../../../lib/api/axiosClient";

export const getTasksByList = (listId: string) =>
  axiosClient.get(`/lists/${listId}/tasks`);

export const createTask = (listId: string, title: string) =>
  axiosClient.post(`/lists/${listId}/tasks`, {
    title,
    description: "",
  });