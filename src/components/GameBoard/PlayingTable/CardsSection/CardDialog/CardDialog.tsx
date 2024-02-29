import * as React from "react";
import { Player } from "../../../../../interfaces/Interfaces";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { BuildDialogProps } from "../../PlayingTable";
import { playerCanAffordCard } from "../../../../../engine/MovesUtil";
import AddIcon from "@mui/icons-material/Add";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogTitleWithClose } from "../../../../Shared/DialogTitleWithClose/DialogTitleWithClose";

interface CardDialogProps {
  build(level: number, index: number): void;
  buildDialogProps?: BuildDialogProps;
  closeDialog(): void;

  open: boolean;

  player: Player;

  reserve(level: number, index: number): void;
}

export const CardDialog: React.FC<CardDialogProps> = ({
  open,
  closeDialog,
  buildDialogProps,
  build,
  reserve,
  player,
}) => {
  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitleWithClose onClose={closeDialog}>Card</DialogTitleWithClose>
      <DialogContent sx={{ marginX: "auto" }}>
        {buildDialogProps && (
          <CardDisplay card={buildDialogProps.card} enabled={true} />
        )}
      </DialogContent>

      <DialogActions>
        <Button
          color={"neutral"}
          disabled={
            buildDialogProps
              ? !playerCanAffordCard(buildDialogProps.card, player)
              : true
          }
          onClick={() => {
            if (buildDialogProps) {
              build(buildDialogProps.level, buildDialogProps.index);
              closeDialog();
            }
          }}
          startIcon={<AddIcon />}
        >
          Purchase
        </Button>
        <Button
          color={"reserve"}
          disabled={player.reservedCards.length >= 3}
          onClick={() => {
            if (buildDialogProps && player.reservedCards.length <= 3) {
              reserve(buildDialogProps.level, buildDialogProps.index);
              closeDialog();
            }
          }}
          startIcon={<SystemUpdateAltIcon />}
        >
          Reserve
        </Button>
      </DialogActions>
    </Dialog>
  );
};
