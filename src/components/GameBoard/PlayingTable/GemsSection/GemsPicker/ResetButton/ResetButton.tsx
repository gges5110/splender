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
      className={
        "font-semibold py-2 px-4 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 col-span-2"
      }
      disabled={disabled}
      onClick={onClick}
      variant={"outlined"}
    >
      <AutorenewIcon /> Reset
    </Button>
  );
};
