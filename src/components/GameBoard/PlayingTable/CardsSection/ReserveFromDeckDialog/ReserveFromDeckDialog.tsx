import { DialogProps } from "../../../../../interfaces/DialogProps";
import { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { DialogTitleWithClose } from "../../../../Shared/DialogTitleWithClose/DialogTitleWithClose";

interface ReserveFromDeckDialogProps extends DialogProps {
  level: number;

  onConfirm(): void;
}

export const ReserveFromDeckDialog: FC<ReserveFromDeckDialogProps> = ({
  level,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitleWithClose onClose={onClose}>
        Reserve from deck
      </DialogTitleWithClose>
      <DialogContent>
        <p className={"text-gray-500"}>
          Would you like to reserve from the deck at level {level + 1}?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>
          <CheckIcon /> Confirm
        </Button>
        <Button onClick={onClose} variant={"outlined"}>
          <CloseIcon />
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
