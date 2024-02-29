import * as React from "react";
import { GemsPicker, GemsPickerMode } from "../GemsPicker/GemsPicker";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

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
  return (
    <Dialog open={open}>
      <DialogTitle className={"text-lg leading-6 font-medium text-gray-700"}>
        Discard gems
      </DialogTitle>
      <DialogContent>
        <GemsPicker
          gems={playerGems}
          gemsToDiscard={playerGems.slice(0, 5).reduce((p, v) => p + v, 0) - 10}
          mode={GemsPickerMode.DISCARD}
          onSelect={discardGems}
        />
      </DialogContent>
    </Dialog>
  );
};
