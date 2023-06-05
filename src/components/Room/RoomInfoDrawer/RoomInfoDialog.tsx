import { LobbyAPI } from "boardgame.io/src/types";
import { useLeaveMatch } from "../../../hooks/UseLeaveMatch";
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { playerNameAtom } from "../../../Atoms";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DialogProps } from "../../../interfaces/DialogProps";
import { MatchPlayerList } from "../../Lobby/Matches/MatchPlayerList";

interface RoomInfoDialogProps extends DialogProps {
  matchData?: LobbyAPI.Match;
}

export const RoomInfoDialog: React.FC<RoomInfoDialogProps> = ({
  matchData,
  onClose,
  open,
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
