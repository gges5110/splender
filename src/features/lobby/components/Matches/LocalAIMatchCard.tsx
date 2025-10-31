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
import { useLocalMatchInfo } from "src/shared/hooks/useLocalMatchInfo";

export const LocalAIMatchCard = () => {
  const localMatchInfo = useLocalMatchInfo();
  const matchID = localMatchInfo?.matchID;
  const state = JSON.parse(localStorage.getItem("bgio_state") || "")[0][1];
  const numPlayers = localMatchInfo?.numPlayers || 1;
  const turn = state.ctx.turn;
  const seed = localMatchInfo?.seed;
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor:
          theme.palette.mode === "light" ? blueGrey[50] : grey[900],
      }}
    >
      <CardHeader subheader={`Match ID: ${matchID}`} />
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
          to={`/room/${matchID}`}
          variant={"contained"}
        >
          Resume
        </Button>
      </CardActions>
    </Card>
  );
};
