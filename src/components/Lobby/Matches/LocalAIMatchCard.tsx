import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  useTheme,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";

export const LocalAIMatchCard = () => {
  const state = JSON.parse(localStorage.getItem("bgio_state") || "")[0][1];
  const numPlayers = state.ctx.numPlayers;
  const turn = state.ctx.turn;
  const seed = state.plugins.random.data.seed;
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor:
          theme.palette.mode === "light" ? blueGrey[50] : grey[900],
      }}
    >
      <CardHeader subheader={`Match ID: localAI`} />
      <CardContent>
        <Box display={"flex"} flexDirection={"column"}>
          <span>Turn: {Math.ceil(turn / numPlayers)}</span>
          <span>Players: {numPlayers}</span>
          <span>Seed: {seed}</span>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/room/localAI?numPlayers=${numPlayers}`}
          variant={"contained"}
        >
          Resume
        </Button>
      </CardActions>
    </Card>
  );
};
