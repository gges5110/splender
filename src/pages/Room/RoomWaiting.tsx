import { LobbyAPI } from "boardgame.io/src/types";
import { MatchType } from "src/Atoms";
import { FC } from "react";
import { useSnackbar } from "notistack";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";
import { MatchPlayerList } from "src/components/Lobby/Matches/MatchPlayerList";

interface RoomWaitingProps {
  matchData: LobbyAPI.Match | undefined;
  matchID: string | undefined;
  matchType: MatchType | undefined;

  onLeaveMatch(): void;

  onStartMatch(): void;

  playerName: string | undefined;
}

export const RoomWaiting: FC<RoomWaitingProps> = ({
  matchData,
  matchID,
  matchType,
  onLeaveMatch,
  onStartMatch,
  playerName,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Container maxWidth={"sm"}>
      <Card>
        <CardHeader
          subheader={<div>Player: {playerName}</div>}
          title={<span>Room ID: {matchID}</span>}
        ></CardHeader>
        <CardContent>
          <MatchPlayerList players={matchData?.players || []} />
        </CardContent>
        <CardActions>
          <Button
            disabled={
              !matchData?.players.every((player) => player.name) &&
              matchType === "online"
            }
            onClick={() => {
              onStartMatch();
            }}
          >
            Start Match
          </Button>
          <Button
            onClick={() => {
              onLeaveMatch();
            }}
            variant={"outlined"}
          >
            Leave
          </Button>
          {matchType === "online" && (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  enqueueSnackbar("Match URL copied!");
                });
              }}
            >
              Share
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  );
};
