import { Card, Player } from "../Interfaces";
import React from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";
import { playerCanAffordCard } from "./PlayingTable/CardDialog/CardDialog";
import { GemDisplay } from "./GemDisplay";
import clsx from "clsx";

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
    return <button className={"w-24 h-32"} />;
  }

  return (
    <button
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      disabled={!enabled}
      className={clsx(
        "w-16 h-24 sm:w-24 sm:h-32 rounded-xl relative shadow-xl select-none",
        {
          "ring-4 ring-gray-400":
            !hideAffordableHint && playerCanAffordCard(card, player),
        }
      )}
      style={{
        backgroundColor: gemsColorStyle[card.color],
        color: gemsTextColorStyle[card.color],
      }}
    >
      <div
        className={
          "absolute top-0 sm:top-2 right-0 sm:right-2 h-8 w-8 text-center align-middle"
        }
      >
        {card.points > 0 && card.points}
      </div>
      <div
        className={
          "absolute bottom-0 left-0 p-2 flex flex-col gap-1 h-24 sm:h-32 justify-end flex-wrap"
        }
      >
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
  );
};
