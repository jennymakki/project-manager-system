import { useState } from "react";
import BoardCard from "../components/BoardCard";

export default function Dashboard() {
  const [name, setName] = useState("");

  const [boards, setBoards] = useState(() => {
    return JSON.parse(localStorage.getItem("boards")) || [];
  });

  const saveBoards = (newBoards) => {
    localStorage.setItem("boards", JSON.stringify(newBoards));
    setBoards(newBoards);
  };

  const createBoard = () => {
    if (!name.trim()) return;

    const newBoard = {
      id: Date.now(),
      name,
    };

    const updated = [...boards, newBoard];
    saveBoards(updated);

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
          onClick={createBoard}
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
