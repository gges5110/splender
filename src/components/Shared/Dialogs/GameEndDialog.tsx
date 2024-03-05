import * as React from "react";
import { useState } from "react";
import { Box, Button, Dialog, TextField } from "@mui/material";
import { localAiInfoAtom, MatchType } from "src/Atoms";
import { resetLocalAI } from "src/hooks/UseCreateMatch";
import { useAtom } from "jotai/index";

interface GameEndDialogProps {
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
  const [seed, setSeed] = useState<string>(
    String(Number(initialSeed) + 1) || "1"
  );
  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed((event.target as HTMLInputElement).value as MatchType);
  };

  const [localAiInfo, setLocalAiInfo] = useAtom(localAiInfoAtom);

  const [open, setOpen] = useState(true);
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <div className={"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        Game over! Player {winner} is the winner.
      </div>
      <Box display={"flex"} flexDirection={"column"} gap={1} px={2} py={2}>
        <Box display={"flex"} gap={1}>
          <TextField
            id={"game-seed"}
            label={"Next Game Seed"}
            onChange={handleSeedChange}
            value={seed}
            variant={"outlined"}
          />
          <Button
            onClick={() => {
              reset();
              resetLocalAI();
              setLocalAiInfo({
                seed,
                position: localAiInfo?.position || 0,
              });
            }}
          >
            New Game
          </Button>
        </Box>
        <Button
          onClick={() => {
            reset();
            resetLocalAI();
            setLocalAiInfo({
              seed: String(Number(initialSeed)),
              position: localAiInfo?.position || 0,
            });
          }}
          variant={"outlined"}
        >
          Replay Same Game
        </Button>
      </Box>
    </Dialog>
  );
};
