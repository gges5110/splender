import { LobbyClient } from "boardgame.io/client";
import { useAtomValue } from "jotai";
import { playerNameAtom } from "../Atoms";
import { serverPort } from "../config";
import { CreateMatchCard } from "../components/Lobby/CreateMatchCard/CreateMatchCard";
import { Matches } from "../components/Lobby/Matches/Matches";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const lobbyClient = new LobbyClient({
  server: `http://localhost:${serverPort}`,
});

export const Lobby = () => {
  const playerName = useAtomValue(playerNameAtom) || "";

  return (
    <Container maxWidth={"md"}>
      <Typography>Welcome to the lobby {playerName}!</Typography>
      <Grid container={true} spacing={2}>
        <Grid sm={6} xs={12}>
          <Matches />
        </Grid>
        <Grid sm={6} xs={12}>
          <CreateMatchCard />
        </Grid>
      </Grid>
    </Container>
  );
};
