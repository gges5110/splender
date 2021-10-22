import React from "react";

interface GameEndDialogProps {
  winner: number | undefined;
}

export const GameEndDialog: React.FC<GameEndDialogProps> = ({ winner }) => {
  if (winner === undefined) {
    return null;
  }

  return (
    <div>
      <div className="z-40 modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0" />
      <dialog
        open={true}
        className={"z-50 fixed top-1/2 rounded-lg bg-gray-200 shadow-lg w-max"}
      >
        <div>Game over! Player {winner + 1} is the winner</div>
      </dialog>
    </div>
  );
};
