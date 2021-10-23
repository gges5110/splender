import React from "react";
import { Card, Player } from "../../../../Interfaces";
import { CardDisplay } from "../../../CardDisplay";
import { playerCanAffordCard } from "../../../PlayingTable/CardDialog/CardDialog";
import { Modal } from "../../../Modal";

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
          <button
            className={
              "bg-gray-100 text-base font-semibold py-2 px-4 rounded-lg shadow-md inline-flex items-center"
            }
            onClick={closeReservedCardsDialog}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
