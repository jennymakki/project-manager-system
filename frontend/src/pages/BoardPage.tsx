import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import ListColumn from "../app/components/blocks/list/ListColumn";
import { Card } from "../app/components/ui/card";
import { Button } from "../app/components/ui/button";
import { useBreakpoint } from "../design-system/hooks/useBreakpoint";
import { useTheme } from "../design-system/theme-provider";

import { useBoard } from "../features/boards/hooks/useBoard";

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
  } = useBoard();

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>{board.name}</h1>

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
