import * as React from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Player } from "../../../Interfaces";

interface GameEndDialogProps {
  winner: number | undefined;
  players: Player[];
  reset(): void;
}

export const GameEndDialog: React.FC<GameEndDialogProps> = ({
  winner,
  reset,
}) => {
  if (winner === undefined) {
    return null;
  }

  return (
    <Modal open={true} onClose={() => {}}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        Game over! Player {winner + 1} is the winner.
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <Button
          onClick={() => {
            reset();
          }}
        >
          New Game
        </Button>
      </div>
    </Modal>
  );
};
