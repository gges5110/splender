import { FC } from "react";
import { NobleDisplay } from "src/components/Shared/NobleDisplay/NobleDisplay";
import { Noble, Player } from "src/interfaces/Interfaces";
import { getVisitingNobleIndexArray } from "src/engine/MovesUtil";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

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
      <DialogTitle className={"text-lg leading-6 font-medium text-gray-700"}>
        Pick Noble
      </DialogTitle>
      <DialogContent>
        <div className={"flex justify-center gap-2"}>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
