import * as React from "react";
import { Card, Player } from "../../../../../Interfaces";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { Modal } from "../../../../Shared/Modal";
import { Button } from "../../../../Shared/Button";
import { playerCanAffordCard } from "../../../../../engine/MovesUtil";
import { PlusIcon } from "@heroicons/react/24/outline";

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
    <Modal onClose={closeReservedCardsDialog} open={reservedCardsDialogOpen}>
      <div className={"flex gap-4 m-6"}>
        {reservedCards.map((reservedCard, index) => (
          <div className={"flex flex-col gap-2 items-center"} key={index}>
            <CardDisplay card={reservedCard} enabled={false} key={index} />
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
    </Modal>
  );
};
