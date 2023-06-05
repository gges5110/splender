import { FC } from "react";
import { DialogProps } from "../../../interfaces/DialogProps";
import { Button, Dialog, DialogTitle } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface NewGameConfirmationDialogProps extends DialogProps {
  onConfirm(): void;
}

export const NewGameConfirmationDialog: FC<NewGameConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <div className={"px-6 py-6 sm:px-6"}>
        <DialogTitle
          className={
            "text-lg font-medium leading-6 text-gray-900 dark:text-gray-300"
          }
        >
          New Game
        </DialogTitle>
        <div className={"mt-2"}>
          <p className={"text-gray-500"}>Would you like to start a new game?</p>
        </div>
      </div>

      <div className={"px-6 py-3 sm:px-6 bg-gray-50 dark:bg-slate-800"}>
        <div className={"flex gap-2"}>
          <Button onClick={onConfirm}>
            <span>
              <CheckIcon /> Confirm
            </span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
