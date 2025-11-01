import { FC } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Button } from "@mui/material";

interface ResetButtonProps {
  disabled: boolean;

  onClick(): void;
}

export const ResetButton: FC<ResetButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{ borderRadius: 100, gridColumn: "span 2 / span 2" }}
      variant={"outlined"}
    >
      <AutorenewIcon /> Reset
    </Button>
  );
};
