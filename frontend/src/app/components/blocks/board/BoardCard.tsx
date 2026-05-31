import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../design-system/theme-provider";
import type { Board } from "../../../../types/board";

export default function BoardCard({ board }: { board: Board }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      onClick={() => navigate(`/boards/${board.id}`)}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        boxShadow: theme.shadows.card,
        cursor: "pointer",
      }}
    >
      <h2
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: 600,
        }}
      >
        {board.name}
      </h2>
    </div>
  );
}
