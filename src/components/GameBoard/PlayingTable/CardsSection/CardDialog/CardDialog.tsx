import * as React from "react";
import { Player } from "../../../../../Interfaces";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { BuildDialogProps } from "../../PlayingTable";
import { playerCanAffordCard } from "../../../../../engine/MovesUtil";
import AddIcon from "@mui/icons-material/Add";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Box, Button, Dialog, DialogActions } from "@mui/material";
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
      <div className={"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        <div className={"sm:flex sm:items-start"}>
          <div className={"flex justify-center mx-auto"}>
            {buildDialogProps && (
              <CardDisplay card={buildDialogProps.card} enabled={true} />
            )}
          </div>
        </div>
      </div>
      <DialogActions>
        <Button
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
          variant={"outlined"}
        >
          <Box display={"flex"} gap={1}>
            <AddIcon /> Purchase
          </Box>
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
        >
          <Box display={"flex"} gap={1}>
            <SystemUpdateAltIcon /> Reserve
          </Box>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
