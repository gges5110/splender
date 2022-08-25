import * as React from "react";

interface GameEndDialogProps {
  winner: number | undefined;

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
    <div>
      <div className="z-40 modal-overlay absolute w-screen h-screen bg-black opacity-25 top-0 left-0" />
      <dialog
        open={true}
        className={"z-50 fixed top-1/2 rounded-lg bg-gray-200 shadow-lg"}
      >
        <div className={"w-max"}>
          Game over! Player {winner + 1} is the winner
        </div>
        <button
          className={"w-max"}
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </dialog>
    </div>
  );
};
