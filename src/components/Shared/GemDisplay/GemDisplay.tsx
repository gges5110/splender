import * as React from "react";
import clsx from "clsx";
import { Box } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";

interface GemDisplayProps {
  className?: string;
  color: number;
  count: number;
}

export const GemDisplay: React.FC<GemDisplayProps> = ({
  color,
  count,
  className,
}) => {
  return (
    <Box
      alignItems={"center"}
      borderRadius={"100%"}
      className={clsx("gem-size", className)}
      display={"flex"}
      justifyContent={"center"}
      sx={{
        userSelect: "none",
        color: `${colorIndexToPalette[color]}.contrastText`,
        backgroundColor: `${colorIndexToPalette[color]}.main`,
      }}
    >
      {count}
    </Box>
  );
};
