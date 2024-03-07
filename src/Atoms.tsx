import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { ColorTheme } from "./styles/paletteTheme";
import { GameHistory } from "src/pages/HistoryPage";

export const playerNameAtom = atomWithStorage<string | undefined>(
  "playerName",
  undefined
);

export const usernameDialogOpenAtom = atom(false);

export type MatchType = "online" | "local" | "localAI";

interface MatchInfo {
  matchID: string;
  matchType: MatchType;
  playerCredentials: string;
  playerID: string;
}

export const matchInfoAtom = atomWithStorage<MatchInfo | undefined>(
  "matchInfo",
  undefined
);
export const colorModeAtom = atomWithStorage<ColorTheme>(
  "colorMode",
  "light" as ColorTheme
);
export const gameBoardDebugAtom = atomWithStorage("gameBoardDebug", false);

export const historyAtom = atomWithStorage<GameHistory[]>("history", []);

export interface User {
  displayName: string;
  uid: string;
}
export const userAtom = atomWithStorage<User | undefined>("user", undefined);
