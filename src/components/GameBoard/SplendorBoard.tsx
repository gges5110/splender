import * as React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "../../Interfaces";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { GameEndDialog } from "../Shared/Dialogs/GameEndDialog";
import { NewGameConfirmationDialog } from "../TitleBar/NewGameConfirmationDialog/NewGameConfirmationDialog";
import { useState } from "react";
import { Button } from "../Shared/Button";
import { useMutation } from "@tanstack/react-query";
import { lobbyClient } from "../../pages/Lobby";
import { useNavigate } from "react-router-dom";

interface SplendorBoardProps extends BoardProps<GameState> {}

export const SplendorBoard: React.FC<SplendorBoardProps> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
  matchID,
  credentials,
}) => {
  const navigate = useNavigate();
  const [
    newGameConfirmationDialogOpen,
    setNewGameConfirmationDialogOpen,
  ] = useState(false);
  const leaveMatch = useMutation({
    mutationFn: () =>
      lobbyClient.leaveMatch("splendor", matchID, {
        playerID: playerID || "",
        credentials: credentials || "",
      }),
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <div className={"w-screen container"}>
      <Button
        onClick={() => {
          leaveMatch.mutate();
        }}
      >
        Leave
      </Button>

      <div className={"flex flex-wrap justify-center "}>
        <NewGameConfirmationDialog
          onClose={() => {
            setNewGameConfirmationDialogOpen(false);
          }}
          onConfirm={() => {
            reset();
            setNewGameConfirmationDialogOpen(false);
          }}
          open={newGameConfirmationDialogOpen}
        />
        <GameEndDialog
          players={G.players}
          reset={() => {
            reset();
          }}
          winner={ctx.gameover?.winner}
        />

        <div className={"w-full sm:w-max sm:p-4 sm:m-2"}>
          <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
        </div>

        <div className={"w-full sm:w-max sm:p-4 px-2 m-2"}>
          <PlayerBoards
            buildFromReserve={moves.buildFromReserve}
            currentPlayer={ctx.currentPlayer}
            playerID={playerID}
            players={G.players}
          />
        </div>
      </div>
    </div>
  );
};
