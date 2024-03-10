import { GameHistory } from "src/pages/HistoryPage";
import { LobbyAPI } from "boardgame.io/src/types";
import { Ctx } from "boardgame.io";

export const useSaveGameResult = () => {
  return {
    saveGameResult: (
      matchData: LobbyAPI.Match,
      ctx: Ctx,
      seed: string,
      winnerName: string
    ) => {
      const prevHistory: GameHistory[] = JSON.parse(
        localStorage.getItem("history") || "[]"
      );
      localStorage.setItem(
        "history",
        JSON.stringify([
          ...prevHistory,
          {
            date: new Date().toISOString(),
            id: matchData.matchID,
            numberOfPlayers: matchData.players.length,
            seed: seed || "",
            turns: Math.ceil(ctx.turn / ctx.numPlayers),
            winner: winnerName,
          },
        ])
      );
    },
  };
};
