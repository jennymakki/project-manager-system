import { useEffect, useState } from "react";

import BoardCard from "../app/components/blocks/board/BoardCard";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { Button } from "../app/components/ui/button";

import { useBoards } from "../features/boards/state/BoardsContext";
import type { Board } from "../types/board";
import { getBoards, createBoard } from "../features/boards/api/boardsAPI";

export default function Dashboard() {
  const [name, setName] = useState("");
const { boards, setBoards } = useBoards();

  useEffect(() => {
    const fetchBoards = async () => {
      const res = await getBoards();
      setBoards(res.data);
    };

    fetchBoards();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    const res = await createBoard(name);
    setBoards((prev) => [...prev, res.data]);
    setName("");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        Your Boards
      </h1>

      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Board name..."
          />

          <Button onClick={handleCreate}>Create</Button>
        </div>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginTop: 16,
        }}
      >
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}