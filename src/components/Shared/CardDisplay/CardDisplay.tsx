import { Card } from "src/interfaces/Interfaces";
import * as React from "react";
import { GemDisplay } from "src/components/Shared/GemDisplay/GemDisplay";
import clsx from "clsx";
import { Button } from "@mui/material";
import { colorIndexToPalette } from "src/styles/paletteTheme";

interface CardDisplayProps {
  affordable?: boolean;
  card: Card | undefined;
  enabled: boolean;
  onClick?(): void;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  enabled,
  onClick,
  affordable = false,
}) => {
  if (card == null) {
    return <Button className={"card-size"} />;
  }

  return (
    <Button
      className={clsx("card-size rounded-lg relative shadow-xl", {
        "card-affordable": affordable,
      })}
      color={colorIndexToPalette[card.color]}
      onClick={() => {
        if (enabled) {
          onClick?.();
        }
      }}
    >
      <div
        className={clsx(
          "absolute top-0 sm:top-2 right-0 sm:right-2 h-8 w-8 text-center align-middle"
        )}
      >
        {card.points > 0 && card.points}
      </div>
      <div
        className={
          "absolute bottom-0 left-0 p-1.5 sm:p-2 flex flex-col gap-1 h-24 sm:h-32 justify-end flex-wrap"
        }
      >
        {card.cost.map((gemCount, index) => {
          if (gemCount === 0) {
            return null;
          }

          return (
            <GemDisplay
              color={index}
              count={gemCount}
              key={index}
              showBorder={card?.color === index}
              size={"small"}
            />
          );
        })}
      </div>
    </Button>
  );
};
