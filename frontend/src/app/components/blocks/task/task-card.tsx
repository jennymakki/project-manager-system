import { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import axiosClient from "../../../../lib/api/axiosClient";

import type { Task } from "../../../../types/task";
import type { Comment } from "../../../../types/comment";

import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useTheme } from "../../../../design-system/theme-provider";

export default function TaskCard({ task }: { task: Task }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    axiosClient
      .get(`/tasks/${task.id}/comments`)
      .then((res) => setComments(res.data))
      .catch(() => {});
  }, [task.id]);

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
    <Card ref={setNodeRef} style={{ ...style, padding: 8, marginTop: 15 }}>
      <div
        {...listeners}
        {...attributes}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          cursor: "grab",
          padding: "4px 6px",
          borderRadius: 6,
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.colors.primary,
          }}
        >
          {task.title}
        </span>
        <span style={{ opacity: 0.4, fontSize: 16 }}>⋮⋮</span>
      </div>

      <div style={{ fontSize: 14, marginTop: 8 }}>
        {comments.map((c) => (
          <Card
            key={c.id}
            style={{
              padding: 8,
              marginBottom: 8,
              background: theme.colors.background,
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 6,
            }}
          >
            <div style={{ fontSize: 13 }}>{c.content}</div>

            <div style={{ opacity: 0.6, fontSize: 11, marginTop: 4 }}>
              {c.author}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          style={{
            fontSize: 13,
          }}
        />

        <Button onClick={createComment}>Post</Button>
      </div>
    </Card>
  );
}
