import { LobbyClient } from "boardgame.io/client";
import { useAtomValue } from "jotai";
import { playerNameAtom } from "src/Atoms";
import { serverPort } from "src/config";
import { CreateMatchCard } from "src/components/Lobby/CreateMatchCard/CreateMatchCard";
import { Matches } from "src/components/Lobby/Matches/Matches";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

export const lobbyClient = new LobbyClient({
  server: `http://localhost:${serverPort}`,
});

export const Lobby = () => {
  const playerName = useAtomValue(playerNameAtom) || "";

  return (
    <Container maxWidth={"md"}>
      <Grid container={true} spacing={2}>
        <Grid item={true} sm={6} xs={12}>
          <Matches />
        </Grid>
        <Grid item={true} sm={6} xs={12}>
          <CreateMatchCard />
        </Grid>
      </Grid>
    </Container>
  );
};
