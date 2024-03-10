import * as React from "react";
import { Box, Button, Dialog } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface GameEndDialogProps {
  winner: number;
}

export const GameEndDialog: React.FC<GameEndDialogProps> = ({ winner }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <div className={"px-4 pt-5 pb-4 sm:p-6 sm:pb-4"}>
        Game over! Player {winner} is the winner.
      </div>
      <Box display={"flex"} flexDirection={"column"} gap={1} px={2} py={2}>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Leave
        </Button>
        <Button component={RouterLink} to={"/history"} variant={"text"}>
          History
        </Button>
      </Box>
    </Dialog>
  );
};
