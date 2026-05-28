import { useEffect, useState } from "react";
import BoardCard from "../app/components/blocks/board/BoardCard";

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
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          placeholder="Board name..."
        />

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}