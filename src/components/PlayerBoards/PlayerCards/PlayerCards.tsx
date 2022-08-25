import { Card, Player } from "../../../Interfaces";
import { useState } from "react";
import * as React from "react";
import { PlayerDialog } from "./PlayerDialog/PlayerDialog";
import { ReservedCardsDialog } from "./ReservedCardsDialog/ReservedCardsDialog";
import clsx from "clsx";
import { gemsColorStyle, gemsTextColorStyle } from "../../../styles";
import {
  getCardCountByColor,
  playerCanAffordCard,
} from "../../../engine/MovesUtil";

interface PlayerCardsProps {
  player: Player;
  cards: Card[];
  reservedCards: Card[];
  isActivePlayer: boolean;

  buildFromReserve(cardIdx: number): void;
}

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
    <div className={"flex justify-start gap-1 sm:gap-4"}>
      {cardCountByColor.map((cardCount, index) => (
        <div className={"w-8 sm:w-12 h-16 sm:h-20"} key={index}>
          {cardCount > 0 && (
            <button
              className={clsx(
                "w-full h-full rounded-md",
                gemsTextColorStyle[index],
                gemsColorStyle[index]
              )}
              onClick={() => setPlayerDialogOpen(true)}
            >
              {cardCount}
            </button>
          )}
        </div>
      ))}
      <div className={"w-8 sm:w-12 h-16 sm:h-20"}>
        {reservedCards.length > 0 && (
          <button
            className={`w-full h-full rounded-md ${gemsTextColorStyle[5]} ${gemsColorStyle[5]}`}
            onClick={() => setReserveDialogOpen(true)}
            disabled={reservedCards.length === 0 || !isActivePlayer}
          >
            {reservedCards.length}
          </button>
        )}
      </div>

      <ReservedCardsDialog
        reservedCards={reservedCards}
        reservedCardsDialogOpen={reserveDialogOpen}
        reservedCardOnClick={(reservedCard, index) => {
          if (playerCanAffordCard(reservedCard, player)) {
            buildFromReserve(index);
            setReserveDialogOpen(false);
          }
        }}
        player={player}
        closeReservedCardsDialog={() => {
          setReserveDialogOpen(false);
        }}
      />

      <PlayerDialog
        player={player}
        playerDialogOpen={playerDialogOpen}
        closePlayerDialog={() => {
          setPlayerDialogOpen(false);
        }}
      />
    </div>
  );
};
