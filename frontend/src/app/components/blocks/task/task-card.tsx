import { useEffect, useState } from "react";
import axiosClient from "../../../../lib/api/axiosClient.js";
import type { Task } from "../../../../types/task.js";
import type { Comment } from "../../../../types/comment.js";

export default function TaskCard({ task }: { task: Task }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

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
    <div className="bg-white p-2 rounded shadow">
      <p className="font-medium">{task.title}</p>

      <div className="mt-2 space-y-1">
        {comments.map((c) => (
          <div key={c.id} className="text-xs bg-gray-50 p-1 rounded">
            <div>{c.content}</div>
            <div className="text-gray-400">{c.author}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mt-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={createComment}>+</button>
      </div>
    </div>
  );
}