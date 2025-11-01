import * as React from "react";
import { Card, Player } from "src/shared/types";
import { CardDisplay } from "src/shared/components/CardDisplay/CardDisplay";
import { playerCanAffordCard } from "src/engine/MovesUtil";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Dialog, DialogContent } from "@mui/material";
import { DialogTitleWithClose } from "src/shared/components/DialogTitleWithClose/DialogTitleWithClose";

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
          <Box display={"flex"} gap={4}>
            {reservedCards.map((reservedCard, index) => (
              <Box
                alignItems={"center"}
                display={"flex"}
                flexDirection={"column"}
                gap={2}
                key={index}
              >
                <CardDisplay card={reservedCard} enabled={false} key={index} />
                <Button
                  color={"neutral"}
                  disabled={!playerCanAffordCard(reservedCard, player)}
                  onClick={() => {
                    reservedCardOnClick(reservedCard, index);
                  }}
                  startIcon={<AddIcon />}
                >
                  Purchase
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};
