import { useEffect, useState } from "react";
import axiosClient from "../../../../lib/api/axiosClient.js";
import type { Task } from "../../../../types/task.js";
import type { Comment } from "../../../../types/comment.js";

import { useTheme } from "../../../../design-system/theme-provider";
import { Input } from "../../ui/input.js";
import { Button } from "../../ui/button.js";
import { Card } from "../../ui/card.js";

export default function TaskCard({ task }: { task: Task }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axiosClient.get(`/tasks/${task.id}/comments`);
      setComments(res.data);
    };

    fetchComments();
  }, [task.id]);

  const createComment = async () => {
    if (!content.trim()) return;

    const res = await axiosClient.post(`/tasks/${task.id}/comments`, {
      content,
    });

    setComments((prev) => [...prev, res.data]);
    setContent("");
  };

  return (
    <Card
      style={{
        padding: theme.spacing.sm,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.sm,
      }}
    >
      <div
        style={{
          fontWeight: 500,
          color: theme.colors.text,
        }}
      >
        {task.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {comments.map((c) => (
          <div
            style={{
              fontSize: theme.typography.fontSize.xs,
              fontWeight: 400,
              color: theme.colors.textSecondary,
            }}
          >
            <div>{c.content}</div>
            <div>{c.author}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: theme.spacing.sm }}>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write comment..."
        />

        <Button onClick={createComment}>+</Button>
      </div>
    </Card>
  );
}
