import * as React from "react";
import { Card, Player } from "../../../../../Interfaces";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { playerCanAffordCard } from "../../../../../engine/MovesUtil";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Dialog, DialogContent } from "@mui/material";
import { DialogTitleWithClose } from "../../../../Shared/DialogTitleWithClose/DialogTitleWithClose";

interface ReservedCardsDialogProps {
  closeReservedCardsDialog(): void;
  player: Player;
  reservedCardOnClick(reservedCard: Card, index: number): void;

  reservedCards: Card[];

  reservedCardsDialogOpen: boolean;
}

export const ReservedCardsDialog: React.FC<ReservedCardsDialogProps> = ({
  reservedCards,
  player,
  reservedCardsDialogOpen,
  closeReservedCardsDialog,
  reservedCardOnClick,
}) => {
  return (
    <Dialog onClose={closeReservedCardsDialog} open={reservedCardsDialogOpen}>
      <DialogTitleWithClose onClose={closeReservedCardsDialog}>
        Reserved Cards
      </DialogTitleWithClose>
      <DialogContent>
        <Container>
          <div className={"flex gap-4"}>
            {reservedCards.map((reservedCard, index) => (
              <div className={"flex flex-col gap-2 items-center"} key={index}>
                <CardDisplay card={reservedCard} enabled={false} key={index} />
                <Button
                  disabled={!playerCanAffordCard(reservedCard, player)}
                  onClick={() => {
                    reservedCardOnClick(reservedCard, index);
                  }}
                  variant={"outlined"}
                >
                  <AddIcon /> Purchase
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
