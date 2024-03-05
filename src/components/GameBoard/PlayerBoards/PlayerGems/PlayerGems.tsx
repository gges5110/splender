import * as React from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import { Box } from "@mui/material";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";

interface PlayerGemsProps {
  gems: number[];
}

export const PlayerGems: React.FC<PlayerGemsProps> = ({ gems }) => (
  <div className={"flex gap-1 sm:gap-4 items-center"}>
    {gems.map((gemCount, index) => (
      <div className={"gem-size"} key={index}>
        {gemCount > 0 && <GemDisplay color={index} count={gemCount} />}
      </div>
    ))}
    <Box>
      {gems.reduce((p, v) => p + v, 0)}
      <DiamondOutlinedIcon />
    </Box>
  </div>
);
