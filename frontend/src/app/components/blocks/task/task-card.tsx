import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import axiosClient from "../../../../lib/api/axiosClient";

import type { Task } from "../../../../types/task";
import type { Comment } from "../../../../types/comment";

import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export default function TaskCard({ task }: { task: Task }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const { setNodeRef, attributes, listeners, transform, isDragging } =
    useDraggable({
      id: task.id.toString(),
    });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const createComment = async () => {
    if (!content.trim()) return;

    const res = await axiosClient.post(`/tasks/${task.id}/comments`, {
      content,
    });

    setComments((prev) => [...prev, res.data]);
    setContent("");
  };

  return (
    <Card ref={setNodeRef} style={{ ...style, padding: 8 }}>
      <div
        {...listeners}
        {...attributes}
        style={{ fontWeight: 600, cursor: "grab" }}
      >
        {task.title}
      </div>

      <div style={{ fontSize: 12 }}>
        {comments.map((c) => (
          <div key={c.id}>
            <div>{c.content}</div>
            <div>{c.author}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={createComment}>+</Button>
      </div>
    </Card>
  );
}
