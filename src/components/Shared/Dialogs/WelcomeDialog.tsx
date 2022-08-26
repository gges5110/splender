import { Modal } from "../Modal";
import { Button } from "../Button";
import { FC } from "react";
import { useLocalStorage } from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface WelcomeDialogProps {
  open: boolean;
  onClose(): void;
}

export const WelcomeDialog: FC<WelcomeDialogProps> = ({ open, onClose }) => {
  const [_, setShowWelcomeDialog] = useLocalStorage("showWelcomeDialog", true);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        Welcome to Splendor! This is an online single player version, you will
        be playing as player 1.
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className={"flex my-2 gap-2"}>
          <Button
            onClick={() => {
              setShowWelcomeDialog(false);
              onClose();
            }}
          >
            <span>Don't show again</span>
          </Button>
          <Button svgPath={<XMarkIcon />} onClick={onClose}>
            <span>Close</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
