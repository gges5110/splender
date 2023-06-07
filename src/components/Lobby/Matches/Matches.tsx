import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { playerNameAtom } from "../../../Atoms";
import { useJoinMatch } from "../../../hooks/UseJoinMatch";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  useTheme,
} from "@mui/material";
import { lobbyClient } from "../../../pages/Lobby";
import { MatchPlayerList } from "./MatchPlayerList";
import { blueGrey, grey } from "@mui/material/colors";
import { LocalAIMatchCard } from "./LocalAIMatchCard";
import { GameName } from "../../../engine/SplendorGame";

export const Matches = () => {
  const { data } = useQuery({
    queryKey: ["matches"],
    queryFn: () => lobbyClient.listMatches(GameName),
  });

  const playerName = useAtomValue(playerNameAtom) || "";
  const joinMatch = useJoinMatch();
  const localAIMatchExists = localStorage.getItem("bgio_state") !== null;
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title={"Matches"} />

      <CardContent>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          {localAIMatchExists && <LocalAIMatchCard />}
          {data?.matches.map((match) => {
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
                    onClick={() => {
                      joinMatch.mutate({
                        matchID: match.matchID,
                        playerName: playerName,
                      });
                    }}
                    variant={"contained"}
                  >
                    Join
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
