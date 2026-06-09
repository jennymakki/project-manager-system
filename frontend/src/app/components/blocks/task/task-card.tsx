import { useDraggable } from "@dnd-kit/core";

import type { Task } from "../../../../types/task";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useTheme } from "../../../../design-system/theme-provider";

import { useState } from "react";
import { useComments } from "../../../../features/comments/hooks/useComments";

import { Pencil, GripVertical, Trash2 } from "lucide-react";

export default function TaskCard({
  task,
  removeTask,
  updateTask,
}: {
  task: Task;
  removeTask: (taskId: number) => void;
  updateTask: (taskId: number, title: string) => Promise<void>;
}) {
  const { theme } = useTheme();
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const { comments, createComment, deleteComment } = useComments(task.id);

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

  const handleCreateComment = async () => {
    await createComment(content);
    setContent("");
  };

  return (
    <Card ref={setNodeRef} style={{ ...style, padding: 8, marginTop: 15 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
          }}
        >
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={async () => {
                await updateTask(task.id, title);
                setIsEditing(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await updateTask(task.id, title);
                  setIsEditing(false);
                }
              }}
              autoFocus
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
              onClick={() => setIsEditing(true)}
            >
              <span
                style={{
                  fontSize: 18,
                  color: theme.colors.primary,
                }}
              >
                {task.title}
              </span>

              <Pencil size={14} opacity={0.7} />
            </div>
          )}
          <GripVertical
            {...listeners}
            {...attributes}
            size={16}
            style={{
              opacity: 0.6,
              cursor: "grab",
              flexShrink: 0,
            }}
          />
        </div>

        <Button
          variant="danger"
          style={{
            padding: "2px",
            width: 28,
            height: 28,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => removeTask(task.id)}
        >
          <Trash2 size={14} />
        </Button>
      </div>

      <div style={{ fontSize: 14, marginTop: 8 }}>
        {comments.map((c) => (
          <Card
            key={c.id}
            style={{
              padding: 8,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 13 }}>{c.content}</div>
              <div style={{ opacity: 0.6, fontSize: 11 }}>{c.author}</div>
            </div>

            <Button
              variant="danger"
              style={{
                padding: "4px 8px",
                fontSize: 12,
                borderRadius: 6,
              }}
              onClick={() => deleteComment(c.id)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 8,
        }}
      >
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />

        <Button
          style={{
            padding: "4px 8px",
            fontSize: 12,
            borderRadius: 6,
          }}
          onClick={handleCreateComment}
        >
          Post
        </Button>
      </div>
    </Card>
  );
}
