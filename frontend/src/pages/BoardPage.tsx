import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axiosClient from "../lib/api/axiosClient";
import ListColumn from "../app/components/blocks/list/ListColumn";

import type { Board } from "../types/board";
import type { List } from "../types/list";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();

  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardRes = await axiosClient.get<Board>(`/boards/${id}`);
        const listsRes = await axiosClient.get<List[]>(`/boards/${id}/lists`);

        setBoard(boardRes.data);
        setLists(listsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchBoardData();
    }
  }, [id]);

  if (!board) {
    return (
      <div className="p-6 text-gray-500">
        Loading board...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {board.name}
      </h1>

      <div className="flex gap-4 overflow-x-auto">
        {lists.map((list) => (
          <ListColumn key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}