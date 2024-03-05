import { useAtom } from "jotai";
import { playerNameAtom, usernameDialogOpenAtom } from "src/Atoms";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { generateName } from "src/utils/GameUtils";

export const UsernameDialog = () => {
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [input, setInput] = useState<string>(playerName || "");
  const [open, setOpen] = useAtom(usernameDialogOpenAtom);

  const handleSetPlayerName = (name: string) => {
    setPlayerName(name);
    setOpen(false);
  };

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
      <DialogContent>
        <Box alignItems={"center"} display={"flex"} gap={1}>
          <TextField
            autoFocus={true}
            fullWidth={true}
            id={"username"}
            label={"username"}
            name={"username"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSetPlayerName(input);
              }
            }}
            sx={{ minWidth: 300 }}
            type={"text"}
            value={input}
            variant={"standard"}
          />
          <Button
            onClick={() => {
              const newName = generateName();
              setInput(newName);
            }}
            sx={{ whiteSpace: "nowrap" }}
            variant={"text"}
          >
            Auto Generate
          </Button>
        </Box>
      </DialogContent>

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
            handleSetPlayerName(input);
          }}
        >
          Set name
        </Button>
      </DialogActions>
    </Dialog>
  );
};
