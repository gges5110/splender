import { Card, Player } from "../Interfaces";
import React from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";
import { playerCanAffordCard } from "./CardDialog";
import { GemDisplay } from "./GemDisplay";

interface CardDisplayProps {
  card: Card | undefined;
  enabled: boolean;
  player: Player;
  hideAffordableHint?: boolean;
  onClick?(): void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  enabled,
  player,
  onClick,
  hideAffordableHint = false,
}) => {
  if (card === undefined) {
    return <button className={"w-28 h-40"} />;
  }

  return (
    <div>
      <button
        onClick={onClick}
        disabled={!enabled}
        className={
          !hideAffordableHint && playerCanAffordCard(card, player)
            ? "w-16 h-32 sm:w-28 sm:h-40 rounded-xl relative shadow-xl ring-4 ring-gray-400"
            : "w-16 h-32 sm:w-28 sm:h-40 rounded-xl relative shadow-xl"
        }
        style={{
          backgroundColor: gemsColorStyle[card.color],
          color: gemsTextColorStyle[card.color],
        }}
      >
        <div
          className={"absolute top-2 right-2 h-8 w-8 text-center align-middle"}
        >
          {card.points > 0 && card.points}
        </div>
        <div className={"absolute bottom-0 left-0 p-2 flex flex-col gap-1"}>
          {card.cost.map(
            (gemCount, index) =>
              gemCount > 0 && (
                <GemDisplay
                  key={index}
                  color={index}
                  count={gemCount}
                  size={"small"}
                  className={"border border-black"}
                />
              )
          )}
        </div>
      </button>
    </div>
  );
};
