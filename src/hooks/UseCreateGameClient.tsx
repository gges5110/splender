import { Game, LobbyAPI, Server } from "boardgame.io/src/types";
import { useMemo } from "react";
import { Bot } from "boardgame.io/ai";
import { DelayedRandomBot } from "src/engine/DelayedRandomBot";
import { Local } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import { SplendorGame } from "src/engine/SplendorGame";
import { SplendorBoard } from "src/components/GameBoard/SplendorBoard";
import { useSnackbar } from "notistack";
import { useLocalAiInfo } from "src/hooks/UseLocalAiInfo";
import { saveGameToRemote } from "src/repository/Remote";
import { useSaveGameResult } from "src/repository/GameHistory";

export type PublicPlayerMetadata = Omit<Server.PlayerMetadata, "credentials">;

export const useCreateGameClient = (
  matchData: LobbyAPI.Match,
  gameBoardDebug: boolean,
  gameSeed: string | number | undefined,
  userPosition: number
) => {
  const players = matchData.players;
  const numPlayers = players?.length || 2;

  const getLocalAIConfig = useMemo(() => {
    const bots: Record<string, typeof Bot> = {};
    for (const player of players || []) {
      if (player.id !== userPosition - 1) {
        bots[String(player.id)] = DelayedRandomBot;
      }
    }

    return Local({
      persist: true,
      bots: bots,
    });
  }, [JSON.stringify(players), userPosition]);

  const { seed, position } = useLocalAiInfo();
  const { enqueueSnackbar } = useSnackbar();
  const { saveGameResult } = useSaveGameResult();
  const onGameEnd: Game["onEnd"] = (_G, ctx) => {
    if (!seed || !position) {
      enqueueSnackbar("Missing info for local AI game. Cannot save history.", {
        variant: "error",
      });
      return;
    }
    const winnerName = ctx.gameover?.winner === position ? "You" : "AI";
    enqueueSnackbar(`${winnerName} won, game saved to history!`, {
      variant: "success",
    });

    saveGameResult(matchData, ctx, seed, winnerName);
  };

  const onTurnEnd: Exclude<Game["turn"], undefined>["onEnd"] = (_, ctx) => {
    // send game state to server only when it's the player's turn
    if (Number(ctx.currentPlayer) !== userPosition - 1) {
      return;
    }
    saveGameToRemote();
  };

  return useMemo(() => {
    return Client({
      game: {
        ...SplendorGame,
        turn: {
          ...SplendorGame.turn,
          onEnd: onTurnEnd,
        },
        seed: gameSeed,
        onEnd: onGameEnd,
      },
      board: SplendorBoard,
      numPlayers: numPlayers,
      multiplayer: getLocalAIConfig,
    });
  }, [numPlayers, gameBoardDebug]);
};
