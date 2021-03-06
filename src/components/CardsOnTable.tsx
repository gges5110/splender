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
    <div className={"w-11/12 m-auto"}>
      <div
        className={
          "grid grid-flow-row grid-cols-5 sm:grid-cols-9 grid-rows-3 gap-1 sm:gap-2"
        }
      >
        {cards
          .map((cards, level: number) => (
            <>
              <div
                className={
                  "w-10 h-20 sm:w-16 sm:h-40 rounded-xl bg-gray-200 flex justify-center items-center m-auto sm:mr-2 shadow-xl"
                }
                key={level}
              >
                <div>{cardsInDeck[level].length}</div>
              </div>
              {cards.map((card, index) => (
                <div className={"col-span-1 sm:col-span-2"} key={level + index}>
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
    </div>
  );
};
