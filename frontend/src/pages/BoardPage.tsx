import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import ListColumn from "../app/components/blocks/list/ListColumn";
import { Card } from "../app/components/ui/card";
import { Button } from "../app/components/ui/button";
import { useBreakpoint } from "../design-system/hooks/useBreakpoint";
import { useTheme } from "../design-system/theme-provider";

import { useBoard } from "../features/boards/hooks/useBoard";

import { Pencil } from "lucide-react";

export default function BoardPage() {
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();

  const {
    board,
    lists,
    tasksByList,
    setTasks,
    moveTask,
    loading,
    removeBoard,
    updateBoard,
  } = useBoard();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (board?.name) {
      setName(board.name);
    }
  }, [board]);

  const saveBoardName = () => {
    if (!board || name.trim() === "") return;

    updateBoard(Number(board.id), name.trim());
    setIsEditing(false);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newListId = over.data?.current?.listId;

    if (!newListId) return;

    moveTask(taskId, newListId);
  };

  if (loading || !board) return <div>Loading...</div>;

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div
        style={{
          minHeight: "100vh",
          background: theme.colors.background,
          padding: isMobile ? 16 : 24,
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={saveBoardName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveBoardName();
                  if (e.key === "Escape") {
                    setName(board.name);
                    setIsEditing(false);
                  }
                }}
                autoFocus
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  padding: 4,
                }}
              />
            ) : (
              <h1
                onClick={() => setIsEditing(true)}
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.opacity = "0.4";
                }}
              >
                {board.name}

                <Pencil
                  size={16}
                  style={{
                    opacity: 0.5,
                    transition: "0.2s",
                  }}
                />
              </h1>
            )}

            <Button
              variant="danger"
              onClick={() => removeBoard(Number(board.id))}
            >
              Delete board
            </Button>
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: theme.spacing.md,
            overflowX: isMobile ? "visible" : "auto",
            marginTop: theme.spacing.md,
          }}
        >
          {lists.map((list) => (
            <ListColumn
              key={list.id}
              list={list}
              tasks={tasksByList[list.id] ?? []}
              setTasks={setTasks}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
