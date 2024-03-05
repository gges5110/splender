import { LobbyAPI } from "boardgame.io/src/types";
import { useLeaveMatch } from "src/hooks/UseLeaveMatch";
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { playerNameAtom } from "src/Atoms";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DialogProps } from "src/interfaces/DialogProps";
import { MatchPlayerList } from "src/components/Lobby/Matches/MatchPlayerList";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "src/interfaces/Interfaces";

interface RoomInfoDialogProps extends DialogProps {
  gameSeed?: Exclude<
    BoardProps<GameState>["ctx"]["_random"],
    undefined
  >["seed"];
  matchData?: LobbyAPI.Match;
}

export const RoomInfoDialog: React.FC<RoomInfoDialogProps> = ({
  matchData,
  onClose,
  open,
  gameSeed,
}) => {
  const leaveMatch = useLeaveMatch();
  const { matchID } = useParams();
  const isLocalAI = matchID === "localAI";
  const playerName = useAtomValue(playerNameAtom);
  const navigate = useNavigate();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Room ID: {matchData?.matchID}</DialogTitle>
      <DialogContent>
        <Typography>Player: {playerName}</Typography>
        {gameSeed !== undefined && <Typography>Seed: {gameSeed}</Typography>}
        <MatchPlayerList players={matchData?.players || []} />
      </DialogContent>
      <DialogActions>
        <Button
          color={"error"}
          onClick={() => {
            if (isLocalAI) {
              navigate("/");
            } else if (matchID) {
              leaveMatch.mutate(
                { matchID },
                {
                  onSettled: () => {
                    navigate("/");
                  },
                }
              );
            }
          }}
          variant={"outlined"}
        >
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
};
