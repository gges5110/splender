import { Ctx } from "boardgame.io";
import { LocalMatchInfo } from "src/hooks/UseLocalMatchInfo";
import { child, get, ref, set } from "firebase/database";
import { database } from "src/firebase/FirebaseApp";
import { GameHistory } from "src/components/History/HistoryTable";
import { User } from "src/interfaces/Interfaces";

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
