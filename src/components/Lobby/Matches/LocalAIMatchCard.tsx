import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  useTheme,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { MatchPlayerList } from "./MatchPlayerList";
import { Link as RouterLink } from "react-router-dom";

export const LocalAIMatchCard = () => {
  const numPlayers = JSON.parse(
    localStorage.getItem("bgio_initial") || ""
  )[0][1].ctx.numPlayers;
  const theme = useTheme();
  return (
    <Card
      key={"localAI"}
      sx={{
        backgroundColor:
          theme.palette.mode === "light" ? blueGrey[50] : grey[900],
      }}
    >
      <CardHeader subheader={`Match ID: localAI`} />
      <CardContent>
        <MatchPlayerList players={[]} />
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
