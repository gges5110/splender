import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";
import { gameStyles } from "src/styles/gameStyles";

interface GemDisplayProps {
  sx?: SxProps<Theme>;
  color: number;
  count: number;
}

export const GemDisplay: React.FC<GemDisplayProps> = ({
  color,
  count,
  sx,
}) => {
  return (
    <Box
      sx={{
        ...gameStyles.gemSize,
        alignItems: "center",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        userSelect: "none",
        color: `${colorIndexToPalette[color]}.contrastText`,
        backgroundColor: `${colorIndexToPalette[color]}.main`,
        ...sx,
      }}
    >
      {count}
    </Box>
  );
};
