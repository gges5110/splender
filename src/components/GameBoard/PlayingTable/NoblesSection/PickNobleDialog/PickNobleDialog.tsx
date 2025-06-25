import { FC } from "react";
import { NobleDisplay } from "src/components/Shared/NobleDisplay/NobleDisplay";
import { Noble, Player } from "src/interfaces/Interfaces";
import { getVisitingNobleIndexArray } from "src/engine/MovesUtil";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";

interface PickNobleDialogProps {
  currentPlayer: string;
  nobles: Array<Noble>;
  open: boolean;
  pick(index: number): void;

  players: Array<Player>;
}

export const PickNobleDialog: FC<PickNobleDialogProps> = ({
  open,
  players,
  nobles,
  currentPlayer,
  pick,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          fontSize: "1.125rem",
          lineHeight: 1.5,
          fontWeight: 500,
          color: "#374151",
        }}
      >
        Pick Noble
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {getVisitingNobleIndexArray(
            players[Number(currentPlayer)],
            nobles
          ).map((nobleIndex) => (
            <NobleDisplay
              key={nobleIndex}
              noble={nobles[nobleIndex]}
              onClick={() => pick(nobleIndex)}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
