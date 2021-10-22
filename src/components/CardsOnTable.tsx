import { Card, Player } from "../Interfaces";
import React from "react";
import { CardDisplay } from "./CardDisplay";
import { BuildDialogProps } from "./SplendorBoard";

interface CardsOnTableProps {
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  player: Player;

  onClick(buildDialogProps: BuildDialogProps): void;

  hideAffordableHint?: boolean;
}

export const CardsOnTable: React.FC<CardsOnTableProps> = ({
  cards,
  cardsInDeck,
  player,
  onClick,
  hideAffordableHint,
}) => {
  return (
    <div
      className={"grid grid-flow-row grid-cols-5 grid-rows-3 gap-1 sm:gap-2"}
    >
      {cards
        .map((cards, level: number) => (
          <React.Fragment key={level}>
            <div
              className={
                "w-10 h-24 sm:w-16 sm:h-32 rounded-xl bg-gray-200 flex justify-center items-center m-auto sm:mr-2 shadow-xl"
              }
              key={level}
            >
              <div>{cardsInDeck[level].length}</div>
            </div>
            {cards.map((card, index) => (
              <div className={"col-span-1"} key={level + index}>
                <CardDisplay
                  player={player}
                  card={card}
                  enabled={true}
                  hideAffordableHint={hideAffordableHint}
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
          </React.Fragment>
        ))
        .reverse()}
    </div>
  );
};
