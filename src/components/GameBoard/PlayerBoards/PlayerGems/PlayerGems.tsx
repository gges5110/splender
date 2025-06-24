import * as React from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Box } from "@mui/material";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { AnimateNumber } from "src/components/Shared/AnimateNumber";

interface PlayerGemsProps {
  gems: number[];
}

export const PlayerGems: React.FC<PlayerGemsProps> = ({ gems }) => (
  <Box alignItems={"center"} display={"flex"} gap={{ xs: 0.5, sm: 2 }}>
    {gems.map((gemCount, index) => (
      <Box className={"gem-size-medium"} key={index}>
        {gemCount > 0 && (
          <GemDisplay color={index} count={gemCount} size={"medium"} />
        )}
      </Box>
    ))}
    <Box alignItems={"center"} display={"flex"} gap={{ xs: 0.5 }}>
      <AnimateNumber value={gems.reduce((p, v) => p + v, 0)}></AnimateNumber>

      <DiamondOutlinedIcon />
    </Box>
  </Box>
);
