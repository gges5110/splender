import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { HelpPage } from "./HelpPage";
import { Lobby } from "./Lobby";
import { Room } from "./Room";

export const router = createBrowserRouter(
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
      ],
    },
  ],
  {
    basename: "/splender/",
  }
);
