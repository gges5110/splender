import { FC } from "react";
import { NobleDisplay } from "../NobleDisplay";
import { Noble, Player } from "../../Interfaces";
import { PlayerID } from "boardgame.io/src/types";
import { getVisitingNobleIndexArray } from "../../MovesUtil";

interface PickNobleDialogProps {
  open: boolean;
  players: Array<Player>;
  nobles: Array<Noble>;
  currentPlayer: PlayerID;

  pick(index: number): void;
}

export const PickNobleDialog: FC<PickNobleDialogProps> = ({
  open,
  players,
  nobles,
  currentPlayer,
  pick,
}) => {
  return (
    <dialog
      className={"rounded-xl overflow-hidden bg-gray-300 p-4 mx-auto shadow-lg"}
      open={open}
    >
      Pick Noble
      <div className={"flex justify-center"}>
        {getVisitingNobleIndexArray(players[Number(currentPlayer)], nobles).map(
          (nobleIndex) => (
            <NobleDisplay
              key={nobleIndex}
              noble={nobles[nobleIndex]}
              onClick={() => pick(nobleIndex)}
            />
          )
        )}
      </div>
    </dialog>
  );
};
