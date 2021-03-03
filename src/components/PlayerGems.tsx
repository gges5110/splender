import React from "react";
import { GemDisplay } from "./GemDisplay";

interface PlayerGemsProps {
  gems: number[];
}

export const PlayerGems: React.FC<PlayerGemsProps> = ({ gems }) => (
  <div className={"flex"}>
    {gems.map((gemCount, index) =>
      gemCount > 0 ? (
        <GemDisplay key={index} color={index} count={gemCount} />
      ) : (
        <div key={index} className={"w-12 h-12 mx-2"} />
      )
    )}
  </div>
);
