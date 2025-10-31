import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { ColorTheme } from "src/services/theme/paletteTheme";
import { GameHistory } from "src/features/history/types";
import { User } from "src/shared/types";

export const playerNameAtom = atomWithStorage<string | undefined>(
  "playerName",
  undefined
);

export const usernameDialogOpenAtom = atom(false);

export const colorModeAtom = atomWithStorage<ColorTheme>(
  "colorMode",
  "light" as ColorTheme
);
export const gameBoardDebugAtom = atomWithStorage("gameBoardDebug", false);

export const historyAtom = atomWithStorage<GameHistory[]>("history", []);

export const userAtom = atomWithStorage<User | undefined>("user", undefined);
export const jotaiDebugAtom = atomWithStorage("jotaiDebug", false);
