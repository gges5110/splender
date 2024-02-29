import * as React from "react";
import { Player } from "../../../interfaces/Interfaces";
import { useState } from "react";
import { Button, Dialog } from "@mui/material";

interface GameEndDialogProps {
  players: Player[];
  reset(): void;
  winner: number | undefined;
}

export const GameEndDialog: React.FC<GameEndDialogProps> = ({
  winner,
  reset,
}) => {
  if (winner === undefined) {
    return null;
  }

  const [open, setOpen] = useState(true);
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <div className={"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        Game over! Player {winner + 1} is the winner.
      </div>
      <div className={"px-4 py-3 sm:px-6"}>
        <Button
          onClick={() => {
            reset();
          }}
        >
          New Game
        </Button>
      </div>
    </Dialog>
  );
};
