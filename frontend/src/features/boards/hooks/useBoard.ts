import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../lib/api/axiosClient"; 
import { getBoard, getBoardLists } from "../api/boardsAPI";
import { deleteBoard as deleteBoardApi } from "../api/boardsAPI";
import { updateBoard as updateBoardApi } from "../api/boardsAPI";

import type { Board } from "../../../types/board";
import type { List } from "../../../types/list";
import type { Task } from "../../../types/task";

export const useBoard = () => {
  const { id } = useParams<{ id: string }>();

  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const [boardRes, listsRes] = await Promise.all([
          getBoard(id),
          getBoardLists(id),
        ]);

        setBoard(boardRes.data);
        setLists(listsRes.data);

        const tasksRes = await axiosClient.get(`/boards/${id}/tasks`);
        setTasks(tasksRes.data ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const removeBoard = async (boardId: number) => {
    if (!confirm("Are you sure you want to delete this board?")) return;

    try {
      await deleteBoardApi(boardId);
      setBoard(null);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const updateBoard = async (boardId: number, name: string) => {
  try {
    const res = await updateBoardApi(boardId, name);

    setBoard(res.data);
  } catch (err) {
    console.error(err);
  }
};

  const moveTask = async (taskId: number, newListId: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, taskListId: newListId } : t)),
    );

    try {
      await axiosClient.patch(`/tasks/${taskId}/move`, {
        taskListId: newListId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    id,
    board,
    lists,
    tasks,
    tasksByList: useMemo(() => {
      return tasks.reduce(
        (acc, task) => {
          if (!acc[task.taskListId]) acc[task.taskListId] = [];
          acc[task.taskListId].push(task);
          return acc;
        },
        {} as Record<number, Task[]>,
      );
    }, [tasks]),
    setTasks,
    moveTask,
    removeBoard,
    updateBoard,
    loading,
  };
};
