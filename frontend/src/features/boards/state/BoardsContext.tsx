import { createContext, useContext, useState } from "react";
import type { Board } from "../../../types/board";

type BoardsContextType = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
};

const BoardsContext = createContext<BoardsContextType | null>(null);

export function BoardsProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<Board[]>([]);

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  );
}

export function useBoards() {
  const ctx = useContext(BoardsContext);
  if (!ctx) throw new Error("useBoards must be used inside BoardsProvider");
  return ctx;
}