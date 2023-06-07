import { ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";

export const themeOptions: Omit<ThemeOptions, "palette"> = {
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
          "&.Mui-disabled": {
            opacity: "0.5",
          },
          minWidth: 10,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: "border-radius: 8px",
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "light" ? grey[50] : grey[900],
        }),
        spacing: "padding: 12px 24px",
      },
    },
    MuiCard: {
      defaultProps: {
        raised: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({ borderRadius: theme.spacing(1) }),
      },
    },
  },
};
