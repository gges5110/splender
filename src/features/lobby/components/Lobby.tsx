import { CreateMatchCard } from "./CreateMatchCard/CreateMatchCard";
import { Matches } from "./Matches/Matches";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { GameResultCard } from "./GameResultCard";

export const Lobby = () => {
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
