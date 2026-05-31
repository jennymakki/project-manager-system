import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useTheme } from "../../../design-system/theme-provider";
import { useBreakpoint } from "../../../design-system/hooks/useBreakpoint";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function AppShell() {
  const { theme } = useTheme();
  const { isMobile } = useBreakpoint();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      <Sidebar
        open={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: theme.spacing.lg,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}