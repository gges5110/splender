import React from "react";
import { Card, Player } from "../../../../Interfaces";
import { CardDisplay } from "../../../CardDisplay";
import { playerCanAffordCard } from "../../../PlayingTable/CardDialog/CardDialog";
import { Modal } from "../../../Modal";
import { Button } from "../../../Button";

interface ReservedCardsDialogProps {
  reservedCardsDialogOpen: boolean;
  player: Player;
  reservedCards: Card[];

  closeReservedCardsDialog(): void;

  reservedCardOnClick(reservedCard: Card, index: number): void;
}

export const ReservedCardsDialog: React.FC<ReservedCardsDialogProps> = ({
  reservedCards,
  player,
  reservedCardsDialogOpen,
  closeReservedCardsDialog,
  reservedCardOnClick,
}) => {
  return (
    <Modal open={reservedCardsDialogOpen} onClose={closeReservedCardsDialog}>
      <div className={"flex gap-4 m-6"}>
        {reservedCards.map((reservedCard, index) => (
          <CardDisplay
            key={index}
            player={player}
            card={reservedCard}
            enabled={playerCanAffordCard(reservedCard, player)}
            onClick={() => {
              reservedCardOnClick(reservedCard, index);
            }}
          />
        ))}
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className={"flex justify-end my-2"}>
          <Button
            svgPath={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            }
            onClick={closeReservedCardsDialog}
          >
            <span>Close</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
