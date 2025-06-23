import * as React from "react";
import { Noble } from "src/interfaces/Interfaces";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Box } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { gameStyles } from "src/styles/gameStyles";

interface NobleDisplayProps {
  noble: Noble;

  onClick?(): void;
}

export const NobleDisplay: React.FC<NobleDisplayProps> = ({
  noble,
  onClick,
}) => {
  return (
    <Box
      sx={{
        ...gameStyles.nobleSize,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? yellow[700] : yellow[400],
        boxShadow: 24,
        borderRadius: 3,
        cursor: onClick !== undefined ? "pointer" : "default",
        position: "relative",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          height: { xs: "24px", sm: "32px" },
          lineHeight: { xs: "24px", sm: "32px" },
          width: { xs: "24px", sm: "32px" },
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        3
      </Box>
      <Box sx={{ position: "absolute", bottom: 0, left: 0, p: { xs: 0.5, sm: 1 } }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap-reverse",
            gap: 0.5,
            height: "100%",
            width: "100%",
          }}
        >
          {noble.cardCountByColors.map(
            (gemCount, index) =>
              gemCount > 0 && (
                <GemDisplay
                  sx={gameStyles.gemSizeSmall}
                  color={index}
                  count={gemCount}
                  key={index}
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};
