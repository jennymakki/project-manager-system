import { useEffect, useState } from "react";

import BoardCard from "../app/components/blocks/board/BoardCard";
import { Input } from "../app/components/ui/input";
import { Button } from "../app/components/ui/button";

import type { Board } from "../types/board";
import { getBoards, createBoard } from "../features/boards/api/boardsAPI";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Boards</h1>

      <div className="flex gap-2 mb-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board name..."
        />

        <Button onClick={handleCreate}>
          Create
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}