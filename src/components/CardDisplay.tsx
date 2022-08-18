import { Card, Player } from "../Interfaces";
import React from "react";
import {
  gemsColorStyle,
  gemsHoverColorStyle,
  gemsTextColorStyle,
} from "./SplendorBoard";
import { playerCanAffordCard } from "./PlayingTable/CardDialog/CardDialog";
import { GemDisplay } from "./GemDisplay";
import clsx from "clsx";

interface CardDisplayProps {
  card: Card | undefined;
  enabled: boolean;
  affordable?: boolean;
  onClick?(): void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  enabled,
  onClick,
  affordable = false,
}) => {
  if (card === undefined) {
    return <button className={"card-size"} />;
  }

  return (
    <button
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      disabled={!enabled}
      className={clsx(
        "card-size rounded-lg relative shadow-xl select-none",
        gemsColorStyle[card.color],
        gemsHoverColorStyle[card.color],
        {
          "card-affordable": affordable,
        }
      )}
    >
      <div
        className={clsx(
          "absolute top-0 sm:top-2 right-0 sm:right-2 h-8 w-8 text-center align-middle",
          gemsTextColorStyle[card.color]
        )}
      >
        {card.points > 0 && card.points}
      </div>
      <div
        className={
          "absolute bottom-0 left-0 p-2 flex flex-col gap-1 h-24 sm:h-32 justify-end flex-wrap"
        }
      >
        {card.cost.map((gemCount, index) => {
          if (gemCount === 0) {
            return null;
          }

          return (
            <GemDisplay
              key={index}
              color={index}
              count={gemCount}
              size={"small"}
              className={clsx("shadow-sm", {
                "border border-gray-300": card?.color === index,
              })}
            />
          );
        })}
      </div>
    </button>
  );
};
