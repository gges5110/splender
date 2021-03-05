import React from "react";
import { GemDisplay } from "./GemDisplay";

interface PlayerGemsProps {
  gems: number[];
}

export const PlayerGems: React.FC<PlayerGemsProps> = ({ gems }) => (
  <div className={"flex gap-4"}>
    {gems.map((gemCount, index) => (
      <div key={index} className={"w-12 h-12"}>
        {gemCount > 0 && <GemDisplay color={index} count={gemCount} />}
      </div>
    ))}
  </div>
);
