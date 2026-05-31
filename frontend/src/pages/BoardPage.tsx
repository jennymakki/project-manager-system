import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListColumn from "../app/components/blocks/list/ListColumn";
import { Card } from "../app/components/ui/card";
import { useBreakpoint } from "../design-system/hooks/useBreakpoint";
import type { Board } from "../types/board";
import type { List } from "../types/list";

import { useTheme } from "../design-system/theme-provider";

import { getBoard, getBoardLists } from "../features/boards/api/boardsAPI";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();

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
    <div
      style={{
        minHeight: "100vh",
        background: theme.colors.background,
        padding: isMobile ? 16 : 24,
        boxSizing: "border-box",
      }}
    >
      {" "}
      <Card>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{board.name}</h1>
      </Card>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: theme.spacing.md,
          overflowX: isMobile ? "visible" : "auto",
          marginTop: theme.spacing.md,
          paddingBottom: theme.spacing.md,
        }}
      >
        {lists.map((list) => (
          <ListColumn key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
