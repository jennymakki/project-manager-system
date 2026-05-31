import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BoardsProvider } from "./features/boards/state/BoardsContext";

import AppRoutes from "./app/router/AppRoutes";
import "./index.css";
import { ThemeProvider } from "./design-system/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BoardsProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BoardsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
