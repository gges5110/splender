import { Card } from "../../../interfaces/Interfaces";
import * as React from "react";
import { GemDisplay } from "../GemDisplay/GemDisplay";
import clsx from "clsx";
import { Button } from "@mui/material";
import { colorIndexToPalette } from "../../../styles/paletteTheme";

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
    return <button className={"card-size"} />;
  }

  return (
    <Button
      className={clsx("card-size rounded-lg relative shadow-xl select-none", {
        "card-affordable": affordable,
      })}
      color={colorIndexToPalette[card.color]}
      onClick={() => {
        if (enabled) {
          onClick?.();
        }
      }}
      onMouseDown={(event) => event.preventDefault()}
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
              className={clsx("shadow-sm gem-size-small", {
                "border border-gray-300": card?.color === index,
              })}
              color={index}
              count={gemCount}
              key={index}
            />
          );
        })}
      </div>
    </Button>
  );
};
