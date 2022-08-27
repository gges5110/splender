import { FC } from "react";
import { Button } from "../../../Shared/Button";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ActionButtonProps {
  disabled: boolean;
  actionLabelText: string;

  onClick(): void;
}

export const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  actionLabelText,
  onClick,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={
        "w-24 h-8 sm:h-10 inline-flex items-center bg-blue-100 text-blue-900 text-base font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
      }
      svgPath={<CheckIcon />}
    >
      <span className={"select-none"}>{actionLabelText}</span>
    </Button>
  );
};
