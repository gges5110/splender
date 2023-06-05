import { FC } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";

interface ActionButtonProps {
  actionLabelText: string;
  disabled: boolean;

  onClick(): void;
}

export const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  actionLabelText,
  onClick,
}) => {
  return (
    <Button
      className={
        "w-24 flex-none h-8 sm:h-10 inline-flex items-center bg-blue-100 text-blue-900 text-base font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
      }
      disabled={disabled}
      onClick={onClick}
    >
      <span>
        <CheckIcon /> {actionLabelText}
      </span>
    </Button>
  );
};
