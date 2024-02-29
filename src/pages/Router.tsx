import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./Layout";
import { HelpPage } from "./HelpPage";
import { Lobby } from "./Lobby";
import { Room } from "./Room/Room";
import { Lobby as BGIOLobby } from "boardgame.io/react";
import { SplendorGame } from "../engine/SplendorGame";
import { SplendorBoard } from "../components/GameBoard/SplendorBoard";
import { serverPort } from "../config";
import { blueGrey, grey } from "@mui/material/colors";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  useTheme,
} from "@mui/material";
import { MatchPlayerList } from "../components/Lobby/Matches/MatchPlayerList";
import { FC } from "react";
import { useAtomValue } from "jotai/index";
import { playerNameAtom } from "../Atoms";

type LobbyRendererProps = Parameters<
  Exclude<BGIOLobby["props"]["renderer"], undefined>
>[0];

const LobbyRenderer: FC<LobbyRendererProps> = ({
  matches,
  phase,
  handleEnterLobby,
  handleExitLobby,
}) => {
  const theme = useTheme();
  const playerName = useAtomValue(playerNameAtom) || "";
  return (
    <>
      Phase: {phase}
      PlayerName: {playerName}
      <Button
        onClick={() => {
          handleEnterLobby(playerName);
        }}
      >
        Enter Lobby
      </Button>
      <Button
        onClick={() => {
          handleExitLobby();
        }}
      >
        Exit Lobby
      </Button>
      {matches.map((match) => {
        return (
          <Card
            key={match.matchID}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? blueGrey[50] : grey[900],
            }}
          >
            <CardHeader subheader={`Match ID: ${match.matchID}`} />
            <CardContent>
              <MatchPlayerList players={match.players} />
            </CardContent>
            <CardActions>
              <Button
                disabled={match.players.every((player) => player.name)}
                variant={"contained"}
              >
                Join
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path={"/"}>
      <Route element={<Lobby />} index={true}></Route>
      <Route element={<HelpPage />} path={"/help"}></Route>
      <Route element={<Room />} path={"/room/:matchID"}></Route>
      <Route
        element={
          <BGIOLobby
            gameComponents={[{ game: SplendorGame, board: SplendorBoard }]}
            gameServer={`http://localhost:${serverPort}`}
            lobbyServer={`http://localhost:${serverPort}`}
            renderer={(args) => <LobbyRenderer {...args} />}
          />
        }
        path={"/lobby"}
      ></Route>
    </Route>
  ),
  {
    basename: "/splender/",
  }
);
