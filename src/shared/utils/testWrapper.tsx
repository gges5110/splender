import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { paletteTheme } from "src/services/theme/paletteTheme";
import { themeOptions } from "src/services/theme/theme";
import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

interface TestWrapperProps {
  children?: React.ReactNode;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  const theme = createTheme({
    palette: paletteTheme,
    ...themeOptions,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />
      {children}
    </ThemeProvider>
  );
};

export const renderWithWrapper = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => {
  return render(ui, { wrapper: TestWrapper, ...options });
};
