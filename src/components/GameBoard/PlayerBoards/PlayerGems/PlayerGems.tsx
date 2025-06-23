import * as React from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Box } from "@mui/material";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { AnimateNumber } from "src/components/Shared/AnimateNumber";
import { gameStyles } from "src/styles/gameStyles";

interface PlayerGemsProps {
  gems: number[];
}

export const PlayerGems: React.FC<PlayerGemsProps> = ({ gems }) => (
  <Box sx={{ alignItems: "center", display: "flex", gap: { xs: 0.5, sm: 2 } }}>
    {gems.map((gemCount, index) => (
      <Box sx={gameStyles.gemSizeMedium} key={index}>
        {gemCount > 0 && (
          <GemDisplay
            sx={gameStyles.gemSizeMedium}
            color={index}
            count={gemCount}
          />
        )}
      </Box>
    ))}
    <Box sx={{ alignItems: "center", display: "flex", gap: { xs: 0.5 } }}>
      <AnimateNumber value={gems.reduce((p, v) => p + v, 0)}></AnimateNumber>
      <DiamondOutlinedIcon />
    </Box>
  </Box>
);
