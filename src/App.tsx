import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import { useAppTheme } from "./hooks/UseAppTheme";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/Router";

export const queryClient = new QueryClient();
const App = () => {
  const theme = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />
      <SnackbarProvider
        action={(snackbarId) => (
          <Button onClick={() => closeSnackbar(snackbarId)}>Dismiss</Button>
        )}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
