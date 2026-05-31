import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "../../design-system/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
