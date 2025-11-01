import React from "react";
import { Box, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

export const DialogTitleWithClose: React.FC<DialogTitleProps> = ({
  children,
  onClose,
  ...other
}) => (
  <DialogTitle {...other}>
    <Box alignItems={"center"} display={"flex"}>
      <Box flexGrow={1}>{children}</Box>

      <IconButton
        aria-label={"close"}
        onClick={onClose}
        sx={{
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </DialogTitle>
);
