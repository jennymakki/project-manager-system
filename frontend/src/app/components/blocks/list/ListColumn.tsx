import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import axiosClient from "../../../../lib/api/axiosClient";

import type { List } from "../../../../types/list";
import type { Task } from "../../../../types/task";

import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import TaskCard from "../task/task-card";

type Props = {
  list: List;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function ListColumn({ list, tasks, setTasks }: Props) {
  const [title, setTitle] = useState("");

  const { setNodeRef, isOver } = useDroppable({
  id: list.id.toString(),
  data: {
    listId: list.id,
  },
});

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
      ref={setNodeRef}
      style={{
        minWidth: 280,
        background: isOver ? "#e6f7ff" : undefined,
      }}
    >
      <h3>{list.name}</h3>

      <div style={{ display: "flex", gap: 8 }}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button onClick={createTask}>+</Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </Card>
  );
}