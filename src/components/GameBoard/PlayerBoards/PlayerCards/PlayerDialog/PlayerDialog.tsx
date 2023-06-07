import { NobleDisplay } from "../../../../Shared/NobleDisplay/NobleDisplay";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { Player } from "../../../../../interfaces/Interfaces";
import * as React from "react";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import { DialogTitleWithClose } from "../../../../Shared/DialogTitleWithClose/DialogTitleWithClose";
interface PlayerDialogProps {
  closePlayerDialog(): void;
  player: Player;

  playerDialogOpen: boolean;
}

export const PlayerDialog: React.FC<PlayerDialogProps> = ({
  playerDialogOpen,
  closePlayerDialog,
  player,
}) => {
  return (
    <Dialog
      PaperProps={{ sx: { minWidth: { sm: 600 } } }}
      onClose={closePlayerDialog}
      open={playerDialogOpen}
    >
      <DialogTitleWithClose onClose={closePlayerDialog}>
        Player nobles and cards
      </DialogTitleWithClose>
      <DialogContent>
        <div className={"flex flex-col justify-center gap-2"}>
          <div className={"flex"}>
            {player.nobles.map((noble, index) => (
              <NobleDisplay key={index} noble={noble} />
            ))}
            {player.nobles.length === 0 && (
              <Typography variant={"body1"}>
                The player does not have any nobles yet.
              </Typography>
            )}
          </div>
          <Box display={"flex"} flexWrap={"wrap"} gap={2}>
            {player.cards.map((card, index) => (
              <CardDisplay card={card} enabled={false} key={index} />
            ))}
            {player.cards.length === 0 && (
              <Typography variant={"body1"}>
                The player does not have any cards yet.
              </Typography>
            )}
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
};
