import * as React from "react";
import { Player } from "../../../interfaces/Interfaces";
import { useState } from "react";
import { Button, Dialog, TextField } from "@mui/material";
import { MatchType } from "../../../Atoms";

interface GameEndDialogProps {
  players: Player[];
  reset(): void;
  seed: string | number | undefined;
  winner: number | undefined;
}

export const GameEndDialog: React.FC<GameEndDialogProps> = ({
  winner,
  reset,
  seed: initialSeed,
}) => {
  if (winner === undefined) {
    return null;
  }
  const [seed, setSeed] = useState<string>(String(initialSeed) || "1");
  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed((event.target as HTMLInputElement).value as MatchType);
  };

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
        <TextField
          id={"game-seed"}
          label={"Game Seed"}
          onChange={handleSeedChange}
          value={seed}
          variant={"outlined"}
        />
        <Button
          onClick={() => {
            reset();
          }}
        >
          Replay Same Game
        </Button>
      </div>
    </Dialog>
  );
};
