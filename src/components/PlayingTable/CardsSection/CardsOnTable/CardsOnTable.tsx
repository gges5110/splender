import { Card, Player } from "../../../../Interfaces";
import * as React from "react";
import { CardOnTable } from "./CardOnTable/CardOnTable";
import { BuildDialogProps } from "../../PlayingTable";

interface CardsOnTableProps {
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  player: Player;

  onClick(buildDialogProps: BuildDialogProps): void;
  deckOnClick(level: number): void;
  hideAffordableHint?: boolean;
}

export const CardsOnTable: React.FC<CardsOnTableProps> = ({
  cards,
  cardsInDeck,
  player,
  onClick,
  deckOnClick,
  hideAffordableHint,
}) => {
  return (
    <div
      className={"grid grid-flow-row grid-cols-5 grid-rows-3 gap-1 sm:gap-2"}
    >
      {cards
        .map((cards, level: number) => (
          <React.Fragment key={level}>
            <button
              className={
                "w-10 h-24 sm:w-16 sm:h-32 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 flex justify-center items-center m-auto sm:mr-2 shadow-xl"
              }
              key={level}
              onClick={() => {
                deckOnClick(level);
              }}
            >
              <div>{cardsInDeck[level].length}</div>
            </button>
            {cards.map((card, index) => {
              const cardOnClick = () => {
                if (card) {
                  onClick({
                    level,
                    index,
                    card,
                  });
                }
              };

              return (
                <CardOnTable
                  card={card}
                  player={player}
                  key={level + index}
                  elementKey={level + index}
                  hideAffordableHint={hideAffordableHint}
                  onClick={cardOnClick}
                />
              );
            })}
          </React.Fragment>
        ))
        .reverse()}
    </div>
  );
};
