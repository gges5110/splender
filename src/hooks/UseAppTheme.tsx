import { createTheme, useMediaQuery } from "@mui/material";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { colorModeAtom } from "../Atoms";

declare module "@mui/material/styles" {
  interface Palette {
    reserve: Palette["primary"];
  }

  interface PaletteOptions {
    reserve: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    reserve: true;
  }
}

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
          reserve: {
            main: "gold",
            contrastText: "#fff",
          },
        },
        typography: {
          fontFamily: [
            "Nunito",
            "Arial",
            "sans-serif",
            "BlinkMacSystemFont",
            "-apple-system",
          ].join(","),
        },
        components: {
          MuiButton: {
            defaultProps: {
              variant: "contained",
            },
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
          MuiCard: {
            defaultProps: {
              raised: true,
            },
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [prefersDarkMode, mode]
  );
};
