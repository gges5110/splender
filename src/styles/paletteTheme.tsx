import { PaletteOptions } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { ButtonPropsColorOverrides } from "@mui/material/Button/Button";
import { OverridableStringUnion } from "@mui/types";

declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"];
    blue: Palette["primary"];
    gold: Palette["primary"];
    green: Palette["primary"];
    neutral: Palette["primary"];
    red: Palette["primary"];
    reserve: Palette["primary"];
    white: Palette["primary"];
  }

  interface PaletteOptions {
    black: PaletteOptions["primary"];
    blue: PaletteOptions["primary"];
    gold: PaletteOptions["primary"];
    green: PaletteOptions["primary"];
    neutral: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    reserve: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    black: true;
    blue: true;
    gold: true;
    green: true;
    neutral: true;
    red: true;
    reserve: true;
    white: true;
  }
}
export const paletteTheme: PaletteOptions = {
  action: {
    disabledBackground: undefined,
    disabled: undefined,
  },
  reserve: {
    main: amber[200],
    dark: amber["A400"],
    contrastText: "#000",
  },
  neutral: {
    light: grey["A100"],
    main: grey[200],
    dark: grey["A400"],
    contrastText: "#000",
  },
  white: {
    main: "#f9fafb",
    dark: "#f3f4f6",
    contrastText: "#000",
  },
  blue: { main: "#0ea5e9", dark: "#0284c7", contrastText: "#fff" },
  green: { main: "#10b981", dark: "#16a34a", contrastText: "#fff" },
  red: { main: "#ef4444", dark: "#dc2626", contrastText: "#fff" },
  black: { main: "#374151", dark: "#1f2937", contrastText: "#fff" },
  gold: { main: "#fde047", dark: "#facc15", contrastText: "#000" },
};

export enum ColorTheme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export const colorIndexToPalette = ([
  "white",
  "blue",
  "green",
  "red",
  "black",
  "gold",
] as unknown) as OverridableStringUnion<
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning",
  ButtonPropsColorOverrides
>[];
