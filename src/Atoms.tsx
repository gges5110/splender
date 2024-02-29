import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { ColorTheme } from "./styles/paletteTheme";

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
