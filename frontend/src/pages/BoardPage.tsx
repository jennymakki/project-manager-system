import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListColumn from "../app/components/blocks/list/ListColumn";

import type { Board } from "../types/board";
import type { List } from "../types/list";

import { getBoard, getBoardLists } from "../features/boards/api/boardsAPI";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();

  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;

      const boardRes = await getBoard(id);
      const listsRes = await getBoardLists(id);

      setBoard(boardRes.data);
      setLists(listsRes.data);
    };

    fetch();
  }, [id]);

  if (!board) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{board.name}</h1>

      <div className="flex gap-4 overflow-x-auto">
        {lists.map((list) => (
          <ListColumn key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}