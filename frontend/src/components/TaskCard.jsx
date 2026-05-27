import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function TaskCard({ task }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosClient.get(`/tasks/${task.id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [task.id]);

  const createComment = async () => {
    if (!content.trim()) return;

    try {
      const res = await axiosClient.post(
        `/tasks/${task.id}/comments`,
        { content }
      );

      setComments((prev) => [...prev, res.data]);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-2 rounded shadow">

      <p className="font-medium">{task.title}</p>

      {task.description && (
        <p className="text-sm text-gray-500">{task.description}</p>
      )}

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
          placeholder="Comment..."
          className="flex-1 text-xs p-1 border rounded"
        />
        <button onClick={createComment}>+</button>
      </div>
    </div>
  );
}