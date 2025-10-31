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
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    sx={{ borderRadius: 100, gridColumn: "span 2 / span 2" }}
  >
    <CheckIcon /> {actionLabelText}
  </Button>
);
