import { Card, Player } from "../Interfaces";
import React from "react";
import { CardDisplay } from "./CardDisplay";
import { BuildDialogProps } from "./SplendorBoard";

interface CardsOnTableProps {
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  player: Player;
  onClick(buildDialogProps: BuildDialogProps): void;
}

export const CardsOnTable: React.FC<CardsOnTableProps> = ({
  cards,
  cardsInDeck,
  player,
  onClick,
}) => {
  return (
    <div className={"grid grid-flow-row grid-cols-9 grid-rows-3 gap-2"}>
      {cards
        .map((cards, level: number) => (
          <>
            <div
              className={
                "w-16 h-40 rounded-xl bg-gray-200 flex justify-center items-center mr-2 shadow-xl"
              }
              key={level}
            >
              <div>{cardsInDeck[level].length}</div>
            </div>
            {cards.map((card, index) => (
              <div className={"col-span-2"} key={level + index}>
                <CardDisplay
                  player={player}
                  card={card}
                  enabled={true}
                  onClick={() => {
                    if (card) {
                      onClick({
                        level,
                        index: index,
                        card,
                      });
                    }
                  }}
                />
              </div>
            ))}
          </>
        ))
        .reverse()}
    </div>
  );
};
