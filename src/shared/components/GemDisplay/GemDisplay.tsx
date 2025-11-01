import * as React from "react";
import { Box } from "@mui/material";
import { colorIndexToPalette } from "src/services/theme/paletteTheme";

interface GemDisplayProps {
  color: number;
  count: number;
  showBorder?: boolean;
  size?: "small" | "medium";
}

export const GemDisplay: React.FC<GemDisplayProps> = ({
  color,
  count,
  size = "medium",
  showBorder = false,
}) => {
  return (
    <Box
      alignItems={"center"}
      borderRadius={"100%"}
      display={"flex"}
      justifyContent={"center"}
      sx={{
        aspectRatio: "1 / 1",
        userSelect: "none",
        color: `${colorIndexToPalette[color]}.contrastText`,
        backgroundColor: `${colorIndexToPalette[color]}.main`,
        boxShadow: 1,
        height: { xs: "2rem", sm: "3rem" },
        width: { xs: "2rem", sm: "3rem" },
        ...(showBorder && {
          border: 1,
          borderColor: "grey.300",
        }),
        ...(size === "small" && {
          height: { xs: "1.5rem", sm: "2rem" },
          width: { xs: "1.5rem", sm: "2rem" },
        }),
      }}
    >
      {count}
    </Box>
  );
};
