import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { HelpPage } from "./pages/HelpPage";
import { Lobby } from "./pages/Lobby";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Room } from "./pages/Room";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/700.css";
import { Lobby as BGIOLobby } from "boardgame.io/react";
import { SplendorGame } from "./engine/SplendorGame";
import { SplendorBoard } from "./components/GameBoard/SplendorBoard";
import { useAppTheme } from "./hooks/UseAppTheme";

export const queryClient = new QueryClient();
const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/help",
            element: <HelpPage />,
          },
          {
            path: "/",
            element: <Lobby />,
          },
          {
            path: "/room/:matchID",
            element: <Room />,
          },
          {
            path: "lobby",
            element: (
              <BGIOLobby
                debug={true}
                gameComponents={[{ game: SplendorGame, board: SplendorBoard }]}
                gameServer={`http://${window.location.hostname}:8002`}
                lobbyServer={`http://${window.location.hostname}:8002`}
              />
            ),
          },
        ],
      },
    ],
    {
      basename: "/splender/",
    }
  );

  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />
      <SnackbarProvider
        action={(snackbarId) => (
          <button onClick={() => closeSnackbar(snackbarId)}>Dismiss</button>
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
