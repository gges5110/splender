import React, { useState } from "react";
import type { GameState } from "../Interfaces";
import { GameEndDialog } from "./Shared/Dialogs/GameEndDialog";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import type { BoardProps } from "boardgame.io/react";
import { WelcomeDialog } from "./Shared/Dialogs/WelcomeDialog";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./Shared/Button";

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
        <GameEndDialog winner={ctx.gameover?.winner} reset={startNewGame} />

        <div className="flex flex-wrap justify-center">
          <div className={"w-full px-2 sm:px-4 mx-4"}>
            <div className={"flex flex-row justify-between items-center"}>
              <h1 className={"font-semibold text-lg"}>Splendor</h1>
              <div className={"flex flex-row gap-2 items-center"}>
                <a href={"https://github.com/gges5110/splender"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                  </svg>
                </a>

                <Button onClick={startNewGame}>New Game</Button>
              </div>
            </div>
          </div>
          <div className={"w-full sm:w-max p-2 sm:p-4 m-2"}>
            <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
          </div>

          <div className={"w-full sm:w-max p-2 sm:p-4 m-2"}>
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
