import { useAtomValue } from "jotai";
import { playerNameAtom } from "src/Atoms";
import { CreateMatchCard } from "src/components/Lobby/CreateMatchCard/CreateMatchCard";
import { Matches } from "src/components/Lobby/Matches/Matches";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GameResultCard } from "src/components/Lobby/GameResultCard";

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
        <Grid item={true} sm={6} xs={12}>
          <GameResultCard />
        </Grid>
      </Grid>
    </Container>
  );
};
