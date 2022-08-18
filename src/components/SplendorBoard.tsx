import React from "react";
import type { GameState } from "../Interfaces";
import { GameEndDialog } from "./Shared/GameEndDialog";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import type { BoardProps } from "boardgame.io/react";

export const SplendorBoard: React.FC<BoardProps<GameState>> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
}) => {
  return (
    <div className={"h-screen flex"}>
      <div className="container mx-auto my-auto py-2 sm:p-8 w-screen sm:w-auto">
        <GameEndDialog winner={ctx.gameover?.winner} reset={reset} />

        <div className="flex flex-wrap justify-center">
          <div className={"w-full sm:w-max p-4 m-2"}>
            <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
          </div>

          <div className={"w-full sm:w-max p-4 m-2"}>
            <PlayerBoards
              players={G.players}
              currentPlayer={ctx.currentPlayer}
              buildFromReserve={moves.buildFromReserve}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
