import { useEffect, useState } from "react";
import axiosClient from "../../../lib/api/axiosClient";
import type { Comment } from "../../../types/comment";

export const useComments = (taskId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axiosClient
      .get(`/tasks/${taskId}/comments`)
      .then((res) => setComments(res.data))
      .catch(console.error);
  }, [taskId]);

  const createComment = async (content: string) => {
    if (!content.trim()) return;

    const res = await axiosClient.post(`/tasks/${taskId}/comments`, {
      content,
    });

    setComments((prev) => [...prev, res.data]);
  };

  const deleteComment = async (commentId: number) => {
  await axiosClient.delete(`/comments/${commentId}`);

  setComments((prev) =>
    prev.filter((comment) => comment.id !== commentId)
  );
};


  return {
    comments,
    createComment,
    deleteComment
  };
};