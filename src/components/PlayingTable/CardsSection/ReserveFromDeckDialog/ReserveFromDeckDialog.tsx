import { Modal, ModalProps } from "../../../Shared/Modal";
import { FC } from "react";
import { Dialog } from "@headlessui/react";
import { Button, Variant } from "../../../Shared/Button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ReserveFromDeckDialogProps extends ModalProps {
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
    <Modal open={open} onClose={onClose}>
      <div className="px-6 py-6 sm:px-6">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Reserve from deck
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-gray-500">
            Would you like to reserve from the deck at level {level + 1}?
          </p>
        </div>
      </div>

      <div className="px-6 py-3 sm:px-6 bg-gray-50">
        <div className={"flex gap-2"}>
          <Button onClick={onConfirm} svgPath={<CheckIcon />}>
            Confirm
          </Button>
          <Button
            variant={Variant.WHITE}
            onClick={onClose}
            svgPath={<XMarkIcon />}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
