import React from "react";
import { GemDisplay } from "../../Shared/GemDisplay/GemDisplay";

interface PlayerGemsProps {
  gems: number[];
}

export const PlayerGems: React.FC<PlayerGemsProps> = ({ gems }) => (
  <div className={"flex gap-1 sm:gap-4"}>
    {gems.map((gemCount, index) => (
      <div key={index} className={"gem-size"}>
        {gemCount > 0 && <GemDisplay color={index} count={gemCount} />}
      </div>
    ))}
  </div>
);
