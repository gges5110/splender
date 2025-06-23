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
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
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
          borderRadius: 6,
          padding: "8px 16px",
          fontSize: 16,
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
            theme.palette.mode === "light" ? grey[100] : grey[900],
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
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === "light" ? grey[100] : grey[900],
          padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => {
          return {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.text.primary
                : undefined,
            fontSize: 14,
          };
        },
      },
    },
  },
};
