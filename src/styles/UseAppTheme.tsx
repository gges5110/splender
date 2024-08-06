import { createTheme, useMediaQuery } from "@mui/material";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { colorModeAtom } from "src/Atoms";
import { themeOptions } from "src/styles/theme";
import { paletteTheme } from "src/styles/paletteTheme";

export const useAppTheme = () => {
  const mode = useColorMode();

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

export const useColorMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorMode = useAtomValue(colorModeAtom);
  return colorMode === "system"
    ? prefersDarkMode
      ? "dark"
      : "light"
    : colorMode;
};
