import { useState } from "react";
import * as React from "react";
import type { GameState } from "../Interfaces";
import { GameEndDialog } from "./Shared/Dialogs/GameEndDialog";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import type { BoardProps } from "boardgame.io/react";
import { WelcomeDialog } from "./Shared/Dialogs/WelcomeDialog";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./Shared/Button";
import { GitHubIcon } from "./Shared/Icons";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const SplendorBoard: React.FC<BoardProps<GameState>> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
}) => {
  const [showWelcomeDialog] = useLocalStorage("showWelcomeDialog", true);
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(showWelcomeDialog);
  const [_, setMatchID] = useLocalStorage("matchID", "1");

  const startNewGame = () => {
    setMatchID((prevState) => {
      return String(Number(prevState) + 1);
    });
    reset();
  };

  return (
    <div className={"h-screen flex"}>
      <div className="container mx-auto my-auto py-2 sm:p-8 w-screen sm:w-auto">
        <WelcomeDialog
          open={welcomeDialogOpen}
          onClose={() => {
            setWelcomeDialogOpen(false);
          }}
        />
        <GameEndDialog
          winner={ctx.gameover?.winner}
          players={G.players}
          reset={startNewGame}
        />

        <div className="flex flex-wrap justify-center">
          <div className={"w-full px-2 sm:px-4 ml-4 sm:mx-4"}>
            <div className={"flex flex-row justify-between items-center"}>
              <h1 className={"font-semibold text-lg"}>Splendor</h1>
              <div className={"flex flex-row gap-2 items-center"}>
                <button
                  className={"rounded-full hover:bg-gray-200 p-1.5"}
                  onClick={() => {
                    setWelcomeDialogOpen(true);
                  }}
                >
                  <InformationCircleIcon className={"h-6 w-6"} />
                </button>
                <a href={"https://github.com/gges5110/splender"}>
                  <GitHubIcon />
                </a>

                <Button onClick={startNewGame}>New Game</Button>
              </div>
            </div>
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
