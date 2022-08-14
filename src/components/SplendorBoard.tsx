import React from "react";
import type { Card, GameState } from "../Interfaces";
import { GameEndDialog } from "./GameEndDialog";
import type { BoardProps } from "boardgame.io/dist/types/packages/react";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { PlayingTable } from "./PlayingTable/PlayingTable";

export const SplendorBoard: React.FC<BoardProps<GameState>> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
}) => {
  return (
    <div className={"h-screen flex"}>
      <div className="container mx-auto my-auto sm:shadow-lg rounded-xl sm:bg-gray-100 py-2 sm:p-8 w-screen sm:w-auto">
        <GameEndDialog winner={ctx.gameover?.winner} reset={reset} />

        <div className="flex flex-wrap justify-center">
          <div className={"w-full sm:w-max p-4 m-2"}>
            <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
          </div>

          <div className={"w-full sm:w-max p-4 m-2 flex-initial"}>
            <div
              className={
                "rounded-xl bg-red-100 p-4 px-6 mx-auto mb-8 shadow-xl"
              }
            >
              <div className={"mx-auto"}>
                <PlayerBoards
                  players={G.players}
                  currentPlayer={ctx.currentPlayer}
                  buildFromReserve={moves.buildFromReserve}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface BuildDialogProps {
  level: number;
  index: number;
  card: Card;
}

export const gemsColorStyle: string[] = [
  "bg-gray-50",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-red-500",
  "bg-gray-700",
  "bg-yellow-300",
];
export const gemsHoverColorStyle: string[] = [
  "hover:bg-gray-100",
  "hover:bg-sky-600",
  "hover:bg-emerald-600",
  "hover:bg-red-600",
  "hover:bg-gray-800",
  "hover:bg-yellow-400",
];

export const gemsTextColorStyle: string[] = [
  "text-black",
  "text-white",
  "text-white",
  "text-white",
  "text-white",
  "text-black",
];
