import { useRef, useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";

import type { List } from "../../../../types/list";
import type { Task } from "../../../../types/task";

import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import TaskCard from "../task/task-card";

import { useTasks } from "../../../../features/tasks/hooks/useTasks";

type Props = {
  list: List;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function ListColumn({ list, tasks, setTasks }: Props) {
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { createTask, removeTask } = useTasks(setTasks);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsCreating(false);
        setTitle("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { setNodeRef, isOver } = useDroppable({
    id: list.id.toString(),
    data: { listId: list.id },
  });

  const handleCreateTask = async () => {
    await createTask(list.id, title);
    setTitle("");
  };

  return (
    <Card
      ref={setNodeRef}
      style={{
        minWidth: 280,
        background: isOver ? "rgba(0, 120, 255, 0.08)" : undefined,
      }}
    >
      <h3>{list.name}</h3>

      <div ref={inputRef} style={{ marginTop: 10 }}>
        {isCreating ? (
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateTask();
                if (e.key === "Escape") {
                  setIsCreating(false);
                  setTitle("");
                }
              }}
              autoFocus
            />

            <Button onClick={handleCreateTask} disabled={!title.trim()}>
              Add
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsCreating(true)} style={{ width: "100%" }}>
            + Add task
          </Button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} removeTask={removeTask} />
        ))}
      </div>
    </Card>
  );
}