import { useEffect, useState } from "react";
import axiosClient from "../../../../lib/api/axiosClient";
import TaskCard from "../task/task-card";
import type { List } from "../../../../types/list";
import type { Task } from "../../../../types/task";

import { useTheme } from "../../../../design-system/theme-provider";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";

export default function ListColumn({ list }: { list: List }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axiosClient.get(`/lists/${list.id}/tasks`);
      setTasks(res.data.content || []);
    };

    fetchTasks();
  }, [list.id]);

  const createTask = async () => {
    if (!title.trim()) return;

    const res = await axiosClient.post(`/lists/${list.id}/tasks`, {
      title,
      description: "",
    });

    setTasks((prev) => [...prev, res.data]);
    setTitle("");
  };

  return (
    <Card
      style={{
        width: 288,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.sm,
      }}
    >
      <h3
        style={{
          fontSize: theme.typography.fontSize.md,
          fontWeight: 500,
          color: theme.colors.text,
        }}
      >
        {list.name}
      </h3>

      <div style={{ display: "flex", gap: theme.spacing.sm }}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />

        <Button onClick={createTask}>+</Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.sm,
        }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </Card>
  );
}
