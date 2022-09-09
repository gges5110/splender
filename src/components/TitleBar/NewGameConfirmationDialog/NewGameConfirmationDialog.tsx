import * as React from "react";
import { FC } from "react";
import { Modal, ModalProps } from "../../Shared/Modal";
import { Dialog } from "@headlessui/react";
import { Button } from "../../Shared/Button";
import { CheckIcon } from "@heroicons/react/24/outline";

interface NewGameConfirmationDialogProps extends ModalProps {
  onConfirm(): void;
}

export const NewGameConfirmationDialog: FC<NewGameConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-6 py-6 sm:px-6">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300"
        >
          New Game
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-gray-500">Would you like to start a new game?</p>
        </div>
      </div>

      <div className="px-6 py-3 sm:px-6 bg-gray-50 dark:bg-slate-800">
        <div className={"flex gap-2"}>
          <Button onClick={onConfirm} svgPath={<CheckIcon />}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
