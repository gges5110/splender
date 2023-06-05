import { useAtom } from "jotai";
import { playerNameAtom, usernameDialogOpenAtom } from "../../../../Atoms";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

export const UsernameDialog = () => {
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [input, setInput] = useState<string>(playerName || "");
  const [open, setOpen] = useAtom(usernameDialogOpenAtom);

  useEffect(() => {
    if (playerName) {
      setInput(playerName);
    }
  }, [playerName]);
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle sx={{ fontWeight: "600" }}>Set Name</DialogTitle>
      <Container>
        <TextField
          autoFocus={true}
          id={"username"}
          label={"username"}
          margin={"dense"}
          name={"username"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              setPlayerName(input);
              setOpen(false);
            }
          }}
          type={"text"}
          value={input}
          variant={"standard"}
        />
      </Container>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          variant={"outlined"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setPlayerName(input);
            setOpen(false);
          }}
        >
          Set name
        </Button>
      </DialogActions>
    </Dialog>
  );
};
