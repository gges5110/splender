import React from "react";
import { GemsPicker, GemsPickerMode } from "../GemsPicker/GemsPicker";

interface DiscardGemDialogProps {
  open: boolean;
  playerGems: number[];

  discardGems(): void;
}

export const DiscardGemsDialog: React.FC<DiscardGemDialogProps> = ({
  open,
  playerGems,
  discardGems,
}) => {
  return (
    <dialog
      className={"rounded-xl overflow-hidden bg-gray-300 p-4 mx-auto shadow-lg"}
      open={open}
    >
      <GemsPicker
        gems={playerGems}
        mode={GemsPickerMode.DISCARD}
        gemsToDiscard={playerGems.slice(0, 5).reduce((p, v) => p + v, 0) - 10}
        onSelect={discardGems}
      />
    </dialog>
  );
};
