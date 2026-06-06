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

  const removeTask = async (taskId: number) => {
  await axiosClient.delete(`/tasks/${taskId}`);

  setTasks((prev) => prev.filter((t) => t.id !== taskId));
};

  return {
    createTask,
    removeTask,
  };
};