import * as React from "react";
import type { GameState } from "../Interfaces";
import { GameEndDialog } from "./Shared/Dialogs/GameEndDialog";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import type { BoardProps } from "boardgame.io/react";
import { useLocalStorage } from "usehooks-ts";
import { TitleBar } from "./TitleBar/TitleBar";

export const SplendorBoard: React.FC<BoardProps<GameState>> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
}) => {
  const [_, setMatchID] = useLocalStorage("matchID", "1");

  const startNewGame = () => {
    setMatchID((prevState) => {
      return String(Number(prevState) + 1);
    });
    reset();
  };

  return (
    <div className={"h-screen flex"}>
      <div className="container mx-auto my-auto py-4 sm:p-8 w-screen sm:w-auto">
        <GameEndDialog
          winner={ctx.gameover?.winner}
          players={G.players}
          reset={startNewGame}
        />

        <div className="flex flex-wrap justify-center">
          <div className={"w-full px-2 sm:px-4 ml-4 sm:mx-4"}>
            <TitleBar startNewGame={startNewGame} />
          </div>
          <div className={"w-full sm:w-max px-2 sm:p-4 m-2"}>
            <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
          </div>

          <div className={"w-full sm:w-max px-2 sm:p-4 m-2"}>
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
