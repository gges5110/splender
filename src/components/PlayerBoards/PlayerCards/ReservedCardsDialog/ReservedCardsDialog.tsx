import * as React from "react";
import { Card, Player } from "../../../../Interfaces";
import { CardDisplay } from "../../../Shared/CardDisplay/CardDisplay";
import { Modal } from "../../../Shared/Modal";
import { Button } from "../../../Shared/Button";
import { playerCanAffordCard } from "../../../../engine/MovesUtil";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
          <div className={"flex flex-col gap-2 items-center"} key={index}>
            <CardDisplay key={index} card={reservedCard} enabled={false} />
            <Button
              disabled={!playerCanAffordCard(reservedCard, player)}
              onClick={() => {
                reservedCardOnClick(reservedCard, index);
              }}
              svgPath={<PlusIcon />}
            >
              Purchase
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className={"flex justify-end my-2"}>
          <Button svgPath={<XMarkIcon />} onClick={closeReservedCardsDialog}>
            <span>Close</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
