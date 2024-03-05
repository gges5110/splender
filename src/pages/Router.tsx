import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./Layout";
import { HelpPage } from "./HelpPage";
import { Lobby } from "./Lobby";
import { Room } from "./Room/Room";
import { HistoryPage } from "src/pages/HistoryPage";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path={"/"}>
      <Route element={<Lobby />} index={true}></Route>
      <Route element={<HelpPage />} path={"/help"}></Route>
      <Route element={<Room />} path={"/room/:matchID"}></Route>
      <Route element={<HistoryPage />} path={"/history"}></Route>
    </Route>
  ),
  {
    basename: "/splender/",
  }
);
