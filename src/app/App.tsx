import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import { useAppTheme } from "src/services/theme/useAppTheme";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { router } from "src/app/Router";

const App = () => {
  const theme = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />
      <SnackbarProvider autoHideDuration={3000}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
