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
    <div className={"h-screen"}>
      <div className="container mx-auto my-auto sm:shadow-lg rounded-xl sm:bg-gray-100 py-2 sm:p-8 w-screen sm:w-auto">
        <GameEndDialog winner={ctx.gameover?.winner} reset={reset} />

        <div className="flex flex-wrap justify-center">
          <div className={"w-max p-1 sm:p-4 sm:m-2"}>
            <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
          </div>

          <div className={"flex-initial p-4 m-2"}>
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
  "white",
  "#2196f3",
  "#4caf50",
  "#dc004e",
  "black",
  "gold",
];
export const gemsTextColorStyle: string[] = [
  "black",
  "white",
  "white",
  "white",
  "white",
  "black",
];
