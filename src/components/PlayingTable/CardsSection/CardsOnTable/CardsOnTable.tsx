import { Card, Player } from "../../../../Interfaces";
import * as React from "react";
import { CardOnTable } from "./CardOnTable/CardOnTable";
import { BuildDialogProps } from "../../PlayingTable";

interface CardsOnTableProps {
  cards: Array<Array<Card | undefined>>;
  cardsInDeck: Array<Array<Card>>;
  player: Player;

  cardOnClick(buildDialogProps: BuildDialogProps): void;
  deckOnClick(level: number): void;
  hideAffordableHint?: boolean;
}

export const CardsOnTable: React.FC<CardsOnTableProps> = ({
  cards: cardsPerLevel,
  cardsInDeck,
  player,
  cardOnClick,
  deckOnClick,
  hideAffordableHint,
}) => {
  return (
    <div
      className={"grid grid-flow-row grid-cols-5 grid-rows-3 gap-1 sm:gap-2"}
    >
      {cardsPerLevel
        .map((cards, level: number) => (
          <React.Fragment key={level}>
            <button
              className={"deck-button"}
              key={level}
              disabled={cardsInDeck[level].length === 0}
              onClick={() => {
                deckOnClick(level);
              }}
            >
              <div>{cardsInDeck[level].length}</div>
            </button>
            {cards.map((card, index) => {
              const onClick = () => {
                if (card) {
                  cardOnClick({
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
                  onClick={onClick}
                />
              );
            })}
          </React.Fragment>
        ))
        .reverse()}
    </div>
  );
};
