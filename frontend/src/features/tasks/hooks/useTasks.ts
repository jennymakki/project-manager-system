import axiosClient from "../../../lib/api/axiosClient";
import type { Task } from "../../../types/task";

export const useTasks = (
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {

  const createTask = async (listId: number, title: string) => {
    if (!title.trim()) return;

    const res = await axiosClient.post(`/lists/${listId}/tasks`, {
      title,
      description: "",
    });

    setTasks((prev) => [...prev, res.data]);
  };

  return {
    createTask,
  };
};