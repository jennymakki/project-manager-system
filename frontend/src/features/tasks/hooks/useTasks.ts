import axiosClient from "../../../lib/api/axiosClient";
import type { Task } from "../../../types/task";
import { updateTask as updateTaskApi } from "../api/tasksApi";

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

const updateTask = async (taskId: number, title: string) => {
  const res = await updateTaskApi(taskId, {
    title,
  });

  setTasks((prev) =>
    prev.map((t) => (t.id === taskId ? res.data : t))
  );
};

  return {
    createTask,
    removeTask,
    updateTask,
  };
};