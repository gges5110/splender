import { Card, Player } from "../Interfaces";
import React, { useState } from "react";
import { gemsColorStyle, gemsTextColorStyle } from "./SplendorBoard";
import { CardDisplay } from "./CardDisplay";
import { playerCanAffordCard } from "./CardDialog";
import { NobleDisplay } from "./NobleDisplay";
import { Button } from "./Button";

interface PlayerCardsProps {
  player: Player;
  cards: Card[];
  reservedCards: Card[];
  isActivePlayer: boolean;
  buildFromReserve(cardIdx: number): void;
}

const getCardCountByColor = (cards: Card[]) => {
  const cardCountByColor: number[] = Array(5).fill(0);
  cards.map((card) => cardCountByColor[card.color]++);
  return cardCountByColor;
};

export const PlayerCards: React.FC<PlayerCardsProps> = ({
  cards,
  reservedCards,
  player,
  isActivePlayer,
  buildFromReserve,
}) => {
  const [reserveDialogOpen, setReserveDialogOpen] = useState<boolean>(false);
  const [playerDialogOpen, setPlayerDialogOpen] = useState<boolean>(false);

  const cardCountByColor = getCardCountByColor(cards);
  return (
    <div className={"flex justify-start gap-4"}>
      <dialog
        open={reserveDialogOpen}
        className={"rounded-lg bg-pink-200 shadow-lg"}
      >
        <div className={"flex gap-4"}>
          {reservedCards.map((reservedCard, index) => (
            <CardDisplay
              player={player}
              card={reservedCard}
              enabled={playerCanAffordCard(reservedCard, player)}
              onClick={() => {
                if (playerCanAffordCard(reservedCard, player)) {
                  buildFromReserve(index);
                  setReserveDialogOpen(false);
                }
              }}
            />
          ))}
        </div>

        <div className={"my-2"}>
          <button
            className={
              "bg-gray-100 text-base font-semibold py-2 px-4 rounded-lg shadow-md inline-flex items-center"
            }
            onClick={() => setReserveDialogOpen(false)}
          >
            Close
          </button>
        </div>
      </dialog>

      <dialog
        open={playerDialogOpen}
        className={"fixed top-1/4 rounded-lg bg-pink-200 shadow-lg w-max"}
      >
        <div className={"flex"}>
          {player.nobles.map((noble, index) => (
            <NobleDisplay noble={noble} key={index} />
          ))}
        </div>
        <div className={"grid grid-flow-row grid-cols-6 gap-2"}>
          {/*<div className={"w-28"}>*/}
          {player.cards.map((card) => (
            <CardDisplay
              player={player}
              card={card}
              enabled={false}
              hideAffordableHint={true}
            />
          ))}
          {/*</div>*/}
        </div>
        <div className={"my-2"}>
          <Button
            svgPath={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            }
            onClick={() => setPlayerDialogOpen(false)}
          >
            <span>Close</span>
          </Button>
        </div>
      </dialog>

      {cardCountByColor.map((cardCount, index) => (
        <div className={"w-12 h-20"} key={index}>
          {cardCount > 0 && (
            <button
              // disabled={true}
              className={"w-full h-full rounded-md"}
              style={{
                backgroundColor: gemsColorStyle[index],
                color: gemsTextColorStyle[index],
              }}
              onClick={() => setPlayerDialogOpen(true)}
            >
              {cardCount}
            </button>
          )}
        </div>
      ))}
      <div className={"w-12 h-20"}>
        {reservedCards.length > 0 && (
          <button
            className={"w-full h-full rounded-md"}
            onClick={() => setReserveDialogOpen(true)}
            disabled={reservedCards.length === 0 || !isActivePlayer}
            style={{
              backgroundColor: gemsColorStyle[5],
              color: gemsTextColorStyle[5],
            }}
          >
            {reservedCards.length}
          </button>
        )}
      </div>
    </div>
  );
};
