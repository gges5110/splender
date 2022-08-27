import * as React from "react";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { WelcomeDialog } from "../Shared/Dialogs/WelcomeDialog";
import {
  CheckIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { GitHubIcon } from "../Shared/Icons";
import { Button, Variant } from "../Shared/Button";
import { Dialog } from "@headlessui/react";
import { Modal, ModalProps } from "../Shared/Modal";

interface TitleBarProps {
  startNewGame(): void;
}

export const TitleBar: FC<TitleBarProps> = ({ startNewGame }) => {
  const [showWelcomeDialog] = useLocalStorage("showWelcomeDialog", true);
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(showWelcomeDialog);
  const [
    newGameConfirmationDialogOpen,
    setNewGameConfirmationDialogOpen,
  ] = useState(false);

  return (
    <>
      <WelcomeDialog
        open={welcomeDialogOpen}
        onClose={() => {
          setWelcomeDialogOpen(false);
        }}
      />
      <NewGameConfirmationDialog
        open={newGameConfirmationDialogOpen}
        onClose={() => {
          setNewGameConfirmationDialogOpen(false);
        }}
        onConfirm={() => {
          startNewGame();
          setNewGameConfirmationDialogOpen(false);
        }}
      />
      <div className={"flex flex-row justify-between items-center"}>
        <h1 className={"font-semibold text-lg"}>Splendor</h1>
        <div className={"flex flex-row gap-2 items-center"}>
          <button
            className={"rounded-full hover:bg-gray-200 p-1.5"}
            onClick={() => {
              setWelcomeDialogOpen(true);
            }}
          >
            <InformationCircleIcon className={"h-6 w-6"} />
          </button>
          <a href={"https://github.com/gges5110/splender"}>
            <GitHubIcon />
          </a>

          <Button
            onClick={() => {
              setNewGameConfirmationDialogOpen(true);
            }}
          >
            New Game
          </Button>
        </div>
      </div>
    </>
  );
};

interface NewGameConfirmationDialogProps extends ModalProps {
  onConfirm(): void;
}

const NewGameConfirmationDialog: FC<NewGameConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-6 py-6 sm:px-6">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          New Game
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-gray-500">Would you like to start a new game?</p>
        </div>
      </div>

      <div className="px-6 py-3 sm:px-6 bg-gray-50">
        <div className={"flex gap-2"}>
          <Button onClick={onConfirm} svgPath={<CheckIcon />}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
