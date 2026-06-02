import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import ListColumn from "../app/components/blocks/list/ListColumn";
import { Card } from "../app/components/ui/card";
import { useBreakpoint } from "../design-system/hooks/useBreakpoint";
import { useTheme } from "../design-system/theme-provider";

import type { Board } from "../types/board";
import type { List } from "../types/list";
import type { Task } from "../types/task";

import { getBoard, getBoardLists } from "../features/boards/api/boardsAPI";
import axiosClient from "../lib/api/axiosClient";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();

  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const [boardRes, listsRes] = await Promise.all([
        getBoard(id),
        getBoardLists(id),
      ]);

      setBoard(boardRes.data);
      setLists(listsRes.data);

      const tasksRes = await axiosClient.get(`/boards/${id}/tasks`);
      setTasks(tasksRes.data ?? []);
    };

    fetchData();
  }, [id]);

  const tasksByList = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (!acc[task.taskListId]) acc[task.taskListId] = [];
        acc[task.taskListId].push(task);
        return acc;
      },
      {} as Record<number, Task[]>,
    );
  }, [tasks]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);

    const newListId = over.data?.current?.listId;
    if (!newListId) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, taskListId: newListId } : t)),
    );

    axiosClient
      .patch(`/tasks/${taskId}/move`, {
        taskListId: newListId,
      })
      .catch(console.error);
  };

  if (!board) return <div>Loading...</div>;

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div
        style={{
          minHeight: "100vh",
          background: theme.colors.background,
          padding: isMobile ? 16 : 24,
        }}
      >
        <Card>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>{board.name}</h1>
        </Card>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: theme.spacing.md,
            overflowX: isMobile ? "visible" : "auto",
            marginTop: theme.spacing.md,
          }}
        >
          {lists.map((list) => (
            <ListColumn
              key={list.id}
              list={list}
              tasks={tasksByList[list.id] ?? []}
              setTasks={setTasks}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
