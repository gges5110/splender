import React from "react";
import { Ctx } from "boardgame.io";

interface GameEndDialogProps {
  ctx: Ctx;
}

export const GameEndDialog: React.FC<GameEndDialogProps> = ({ ctx }) => {
  return (
    <div className={ctx.gameover?.winner ? "" : "hidden"}>
      <div className="z-40 modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0" />
      <dialog
        open={true}
        className={"z-50 fixed top-1/2 rounded-lg bg-gray-200 shadow-lg w-max"}
      >
        <div>Game over! Winner is {ctx.gameover?.winner}</div>
      </dialog>
    </div>
  );
};
