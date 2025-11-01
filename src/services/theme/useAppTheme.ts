import { createTheme, useMediaQuery } from "@mui/material";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { colorModeAtom } from "src/state/atoms";
import { themeOptions } from "src/services/theme/theme";
import { paletteTheme } from "src/services/theme/paletteTheme";

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
