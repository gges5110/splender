import { useAtom } from "jotai";
import { playerNameAtom, userAtom, usernameDialogOpenAtom } from "src/Atoms";
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
import { closeSnackbar, useSnackbar } from "notistack";
import { loadGameToLocal } from "src/repository/Remote";

export const UserDialog = () => {
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [input, setInput] = useState<string>(playerName || "");
  const [open, setOpen] = useAtom(usernameDialogOpenAtom);
  const [user] = useAtom(userAtom);
  const { enqueueSnackbar } = useSnackbar();

  const handleSetPlayerName = (name: string) => {
    setPlayerName(name);
    setOpen(false);
  };

  useEffect(() => {
    if (playerName) {
      setInput(playerName);
    }
  }, [playerName, user]);
  return (
    <Dialog
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <DialogTitle sx={{ fontWeight: "600" }}>User Dialog</DialogTitle>
      <DialogContent>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          {user ? (
            <Button
              onClick={() => {
                const key = enqueueSnackbar("Loading", {
                  variant: "info",
                  autoHideDuration: 3000,
                });

                loadGameToLocal(user).then((value) => {
                  closeSnackbar(key);

                  if (value === "sameSession") {
                    enqueueSnackbar(
                      "Last game is from same browser, skip loading",
                      {
                        variant: "warning",
                        autoHideDuration: 3000,
                      }
                    );
                    return;
                  } else if (value !== "success") {
                    return;
                  }

                  window.location.reload();
                  enqueueSnackbar("Game Loaded!", {
                    variant: "success",
                    autoHideDuration: 3000,
                  });
                  setOpen(false);
                });
              }}
            >
              Load Game from Cloud
            </Button>
          ) : (
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
          )}
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
