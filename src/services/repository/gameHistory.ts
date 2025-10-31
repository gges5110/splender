import { Ctx } from "boardgame.io";
import { LocalMatchInfo } from "src/features/lobby/types";
import { child, get, ref, set } from "firebase/database";
import { database } from "src/services/firebase/firebaseApp";
import { GameHistory } from "src/features/history/types";
import { User } from "src/shared/types";

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

export const sendGameHistoryWithCloud = async (user: User) => {
  const prevHistory: GameHistory[] = JSON.parse(
    localStorage.getItem("history") || "[]"
  );
  try {
    await set(ref(database, `users/${user.uid}/history`), prevHistory);
  } catch (error) {
    console.error(error);
  }
};

export const loadGameHistoryFromCloud = async (
  user: User
): Promise<GameHistory[] | undefined> => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `users/${user.uid}/history`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }
};
