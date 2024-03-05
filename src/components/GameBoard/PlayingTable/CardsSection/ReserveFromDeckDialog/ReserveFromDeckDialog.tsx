import { DialogProps } from "src/interfaces/DialogProps";
import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { DialogTitleWithClose } from "src/components/Shared/DialogTitleWithClose/DialogTitleWithClose";

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
        <DialogContentText>
          Would you like to reserve from the deck at level {level + 1}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} startIcon={<CheckIcon />}>
          Confirm
        </Button>
        <Button
          onClick={onClose}
          startIcon={<CloseIcon />}
          variant={"outlined"}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
