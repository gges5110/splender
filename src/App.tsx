import "./App.css";
import { SplendorClient } from "./engine/SplendorClient";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { HelpPage } from "./pages/HelpPage";
import * as React from "react";
import { Lobby } from "./pages/Lobby";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateMatchPage } from "./pages/CreateMatchPage";
import { Room } from "./pages/Room";

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
            path: "/game/:matchID/player/:playerID/:secret",
            element: <GameInstance />,
          },
          {
            path: "/createMatch",
            element: <CreateMatchPage />,
          },
          {
            path: "/room/:matchID",
            element: <Room />,
          },
        ],
      },
    ],
    {
      basename: "/splender",
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const GameInstance: React.FC = () => {
  const { matchID, playerID, secret } = useParams();

  return (
    <SplendorClient
      credentials={secret}
      debug={true}
      matchID={matchID}
      playerID={playerID}
    />
  );
};

export default App;
