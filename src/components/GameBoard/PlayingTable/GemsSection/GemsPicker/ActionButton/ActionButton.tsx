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
      className={"col-span-2"}
      disabled={disabled}
      onClick={onClick}
      sx={{ borderRadius: 100 }}
    >
      <CheckIcon /> {actionLabelText}
    </Button>
  );
};
