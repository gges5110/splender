import React, { useState } from "react";
import type { GameState } from "../Interfaces";
import { GameEndDialog } from "./Shared/Dialogs/GameEndDialog";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import type { BoardProps } from "boardgame.io/react";
import { WelcomeDialog } from "./Shared/Dialogs/WelcomeDialog";

export const SplendorBoard: React.FC<BoardProps<GameState>> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
}) => {
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(true);

  return (
    <div className={"h-screen flex"}>
      <div className="container mx-auto my-auto py-2 sm:p-8 w-screen sm:w-auto">
        <WelcomeDialog
          open={welcomeDialogOpen}
          onClose={() => {
            setWelcomeDialogOpen(false);
          }}
        />
        <GameEndDialog winner={ctx.gameover?.winner} reset={reset} />

        <div className="flex flex-wrap justify-center">
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
