import { createTheme, useMediaQuery } from "@mui/material";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { colorModeAtom } from "../Atoms";
import { themeOptions } from "../styles/theme";
import { paletteTheme } from "../styles/paletteTheme";

export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorMode = useAtomValue(colorModeAtom);
  const mode =
    colorMode === "system" ? (prefersDarkMode ? "dark" : "light") : colorMode;

  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...paletteTheme,
        },
        ...themeOptions,
      }),
    [mode]
  );
};
