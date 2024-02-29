import { LobbyAPI, Server } from "boardgame.io/src/types";
import { useAtomValue } from "jotai";
import { matchInfoAtom } from "../Atoms";
import { useMemo } from "react";
import { Bot } from "boardgame.io/ai";
import { DelayedRandomBot } from "../engine/DelayedRandomBot";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import { SplendorGame } from "../engine/SplendorGame";
import { SplendorBoard } from "../components/GameBoard/SplendorBoard";
import { serverPort } from "../config";
import { useParams } from "react-router-dom";

export type PublicPlayerMetadata = Omit<Server.PlayerMetadata, "credentials">;

export const useGameClient = (
  matchData: LobbyAPI.Match | undefined,
  gameBoardDebug: boolean
) => {
  const { matchID } = useParams();
  const isLocalAI = matchID === "localAI";
  const matchInfo = useAtomValue(matchInfoAtom);
  const matchType = isLocalAI ? "localAI" : matchInfo?.matchType;
  const players = matchData?.players;
  const numPlayers = players?.length || 2;

  const getLocalAIConfig = useMemo(() => {
    const bots: Record<string, typeof Bot> = {};
    for (const player of players || []) {
      if (player.id !== 0) {
        bots[String(player.id)] = DelayedRandomBot;
      }
    }

    return Local({
      persist: true,
      bots: bots,
    });
  }, [JSON.stringify(players)]);

  return useMemo(() => {
    return Client({
      game: SplendorGame,
      board: SplendorBoard,
      numPlayers: numPlayers,
      multiplayer:
        matchType === "online"
          ? SocketIO({ server: `localhost:${serverPort}` })
          : matchType === "localAI"
          ? getLocalAIConfig
          : getLocalAIConfig,
    });
  }, [matchType, numPlayers, gameBoardDebug]);
};