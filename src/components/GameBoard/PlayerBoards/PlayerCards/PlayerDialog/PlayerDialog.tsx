import { NobleDisplay } from "../../../../Shared/NobleDisplay/NobleDisplay";
import { CardDisplay } from "../../../../Shared/CardDisplay/CardDisplay";
import { Player } from "../../../../../Interfaces";
import * as React from "react";
import { Box, Dialog, DialogContent } from "@mui/material";
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
        <div className={"sm:flex sm:items-start"}>
          <div className={"flex flex-col justify-center gap-2"}>
            <div className={"flex"}>
              {player.nobles.map((noble, index) => (
                <NobleDisplay key={index} noble={noble} />
              ))}
            </div>
            <Box display={"flex"} flexWrap={"wrap"} gap={2}>
              {player.cards.map((card, index) => (
                <CardDisplay card={card} enabled={false} key={index} />
              ))}
            </Box>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
