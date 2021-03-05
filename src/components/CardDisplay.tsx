import { Card, Player } from "../Interfaces";
import React from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";
import { motion } from "framer-motion";
import { playerCanAffordCard } from "./CardDialog";

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
    <motion.div
      initial={{
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <button
        onClick={onClick}
        disabled={!enabled}
        className={
          !hideAffordableHint && playerCanAffordCard(card, player)
            ? "w-28 h-40 rounded-xl relative shadow-xl ring-4 ring-gray-400"
            : "w-28 h-40 rounded-xl relative shadow-xl"
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
        <div className={"absolute bottom-0 left-0 p-2"}>
          {card.cost.map(
            (gemCount, index) =>
              gemCount > 0 && (
                <div
                  key={index}
                  className={"h-8 w-8 rounded-full border border-black mt-1"}
                  style={{
                    backgroundColor: gemsColorStyle[index],
                    color: gemsTextColorStyle[index],
                  }}
                >
                  {gemCount}
                </div>
              )
          )}
        </div>
      </button>
    </motion.div>
  );
};
