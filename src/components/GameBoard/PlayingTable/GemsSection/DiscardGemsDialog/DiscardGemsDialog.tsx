import * as React from "react";
import { GemsPicker, GemsPickerMode } from "../GemsPicker/GemsPicker";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";

interface DiscardGemDialogProps {
  discardGems(gems: number[]): void;
  open: boolean;

  playerGems: number[];
}

export const DiscardGemsDialog: React.FC<DiscardGemDialogProps> = ({
  open,
  playerGems,
  discardGems,
}) => {
  const gemsToDiscard = playerGems.reduce((p, v) => p + v, 0) - 10;
  return (
    <Dialog open={open}>
      <DialogTitle>Discard gems</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 1 }}>
          You need to discard {gemsToDiscard} gem{gemsToDiscard > 1 && "s"}.
        </Box>
        <GemsPicker
          gems={playerGems}
          gemsToDiscard={gemsToDiscard}
          mode={GemsPickerMode.DISCARD}
          onSelect={discardGems}
        />
      </DialogContent>
    </Dialog>
  );
};
