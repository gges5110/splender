import * as React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "src/shared/types";
import { PlayingTable } from "./PlayingTable/PlayingTable";
import { PlayerBoards } from "./PlayerBoards/PlayerBoards";
import { GameEndDialog } from "src/shared/components/Dialogs/GameEndDialog";
import { useEffect } from "react";
import { LobbyAPI } from "boardgame.io/src/types";
import { Box, Typography } from "@mui/material";
import { useIncrementSeed } from "src/shared/hooks/useLocalMatchInfo";
import { resetLocalGame } from "src/shared/utils/localStorage";

interface SplendorBoardProps extends BoardProps<GameState> {
  match: LobbyAPI.Match;
  seed?: Exclude<BoardProps<GameState>["ctx"]["_random"], undefined>["seed"];
}

export const SplendorBoard: React.FC<SplendorBoardProps> = ({
  ctx,
  G,
  moves,
  playerID,
  match,
  seed,
}) => {
  const gameEnded = ctx.gameover?.winner !== undefined;
  const incrementSeed = useIncrementSeed();

  useEffect(() => {
    return () => {
      if (gameEnded) {
        resetLocalGame();
        incrementSeed();
      }
    };
  }, [gameEnded]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      mx={"auto"}
      width={{ xs: "100%", sm: "fit-content" }}
    >
      <Box
        alignItems={"center"}
        display={"flex"}
        gap={2}
        mb={1}
        ml={{ xs: 1, sm: 0 }}
        width={"fit-content"}
      >
        <Typography>Turn: {Math.ceil(ctx.turn / ctx.numPlayers)}</Typography>
        <Typography>Seed: {seed}</Typography>
      </Box>
      {gameEnded && <GameEndDialog winner={ctx.gameover?.winner} />}

      <Box
        display={"flex"}
        flexWrap={{ xs: "wrap" }}
        gap={4}
        width={{ xs: "100%", md: "fit-content" }}
      >
        <Box width={{ xs: "100%", md: "max-content" }}>
          <PlayingTable G={G} ctx={ctx} moves={moves} playerID={playerID} />
        </Box>
        <Box width={{ xs: "100%", md: "max-content" }}>
          <PlayerBoards
            buildFromReserve={moves.buildFromReserve}
            currentPlayer={ctx.currentPlayer}
            gameEnded={gameEnded}
            match={match}
            playerID={playerID}
            players={G.players}
          />
        </Box>
      </Box>
    </Box>
  );
};
