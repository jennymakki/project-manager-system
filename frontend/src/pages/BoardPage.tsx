import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListColumn from "../app/components/blocks/list/ListColumn";
import { Card } from "../app/components/ui/card";

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
    <div style={{ padding: 24 }}>
      <Card>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>
          {board.name}
        </h1>
      </Card>

      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          marginTop: 16,
        }}
      >
        {lists.map((list) => (
          <ListColumn key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}