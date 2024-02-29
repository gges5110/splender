import * as React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "../../interfaces/Interfaces";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { GameEndDialog } from "../Shared/Dialogs/GameEndDialog";
import { NewGameConfirmationDialog } from "../TitleBar/NewGameConfirmationDialog/NewGameConfirmationDialog";
import { useState } from "react";
import { LobbyAPI } from "boardgame.io/src/types";
import { Box, Button, Typography } from "@mui/material";
import { RoomInfoDialog } from "../Room/RoomInfoDrawer/RoomInfoDialog";

interface SplendorBoardProps extends BoardProps<GameState> {
  match: LobbyAPI.Match;
}

export const SplendorBoard: React.FC<SplendorBoardProps> = ({
  ctx,
  G,
  moves,
  playerID,
  reset,
  match,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [
    newGameConfirmationDialogOpen,
    setNewGameConfirmationDialogOpen,
  ] = useState(false);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <RoomInfoDialog
        matchData={match}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        open={isDrawerOpen}
      />
      <Box
        alignItems={"center"}
        display={"flex"}
        gap={2}
        mb={1}
        width={"fit-content"}
      >
        <Button
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          Room Info
        </Button>
        <Typography>Turn: {ctx.turn}</Typography>
      </Box>

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

      <Box
        alignSelf={"center"}
        display={"flex"}
        flexWrap={{ xs: "wrap", lg: "nowrap" }}
        gap={4}
        justifyItems={"center"}
        mx={"auto"}
        width={{ xs: "100%", md: "fit-content" }}
      >
        <Box width={{ xs: "100%", md: "max-content" }}>
          <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
        </Box>
        <Box width={{ xs: "100%", md: "max-content" }}>
          <PlayerBoards
            buildFromReserve={moves.buildFromReserve}
            currentPlayer={ctx.currentPlayer}
            match={match}
            playerID={playerID}
            players={G.players}
          />
        </Box>
      </Box>
    </Box>
  );
};