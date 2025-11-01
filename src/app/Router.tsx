import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./Layout";
import { HelpPage } from "./HelpPage";
import { Lobby } from "src/features/lobby/components/Lobby";
import { RoomPage } from "src/features/game-board/components/RoomPage";
import { HistoryPage } from "src/features/history/components/HistoryPage";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path={"/"}>
      <Route element={<Lobby />} index={true}></Route>
      <Route element={<HelpPage />} path={"/help"}></Route>
      <Route element={<RoomPage />} path={"/room/:matchID"}></Route>
      <Route element={<HistoryPage />} path={"/history"}></Route>
    </Route>
  ),
  {
    basename: "/splender/",
  }
);
