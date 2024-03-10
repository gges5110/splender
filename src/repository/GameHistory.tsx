import { GameHistory } from "src/pages/HistoryPage";
import { Ctx } from "boardgame.io";
import { LocalMatchInfo } from "src/hooks/UseLocalMatchInfo";

export const useSaveGameResult = () => {
  return {
    saveGameResult: (
      localMatchInfo: LocalMatchInfo,
      ctx: Ctx,
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
            id: localMatchInfo.matchID,
            numberOfPlayers: localMatchInfo.numPlayers,
            seed: localMatchInfo.seed,
            turns: Math.ceil(ctx.turn / ctx.numPlayers),
            winner: winnerName,
          },
        ])
      );
    },
  };
};
