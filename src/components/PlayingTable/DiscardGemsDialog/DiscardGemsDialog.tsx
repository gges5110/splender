import React from "react";
import { GemsPicker, GemsPickerMode } from "../GemsPicker/GemsPicker";
import { Modal } from "../../Shared/Modal";
import { Dialog } from "@headlessui/react";

interface DiscardGemDialogProps {
  open: boolean;
  playerGems: number[];

  discardGems(gems: number[]): void;
}

export const DiscardGemsDialog: React.FC<DiscardGemDialogProps> = ({
  open,
  playerGems,
  discardGems,
}) => {
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="p-6">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-700"
        >
          Discard gems
        </Dialog.Title>
        <div className={"mt-2"}>
          <GemsPicker
            gems={playerGems}
            mode={GemsPickerMode.DISCARD}
            gemsToDiscard={
              playerGems.slice(0, 5).reduce((p, v) => p + v, 0) - 10
            }
            onSelect={discardGems}
          />
        </div>
      </div>
    </Modal>
  );
};
