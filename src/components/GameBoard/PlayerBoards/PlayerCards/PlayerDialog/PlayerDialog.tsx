import { NobleDisplay } from "src/components/Shared/NobleDisplay/NobleDisplay";
import { CardDisplay } from "src/components/Shared/CardDisplay/CardDisplay";
import { Player } from "src/interfaces/Interfaces";
import * as React from "react";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import { DialogTitleWithClose } from "src/components/Shared/DialogTitleWithClose/DialogTitleWithClose";
interface PlayerDialogProps {
  closePlayerDialog(): void;
  player: Player;
  playerDialogOpen: boolean;
  playerName: string;
}

export const PlayerDialog: React.FC<PlayerDialogProps> = ({
  playerDialogOpen,
  closePlayerDialog,
  player,
  playerName,
}) => {
  return (
    <Dialog
      PaperProps={{ sx: { minWidth: { sm: 600 } } }}
      onClose={closePlayerDialog}
      open={playerDialogOpen}
    >
      <DialogTitleWithClose onClose={closePlayerDialog}>
        <PlayerName playerName={playerName} /> nobles and cards
      </DialogTitleWithClose>
      <DialogContent>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          justifyContent={"center"}
        >
          <Box display={"flex"} gap={2}>
            {player.nobles.map((noble, index) => (
              <NobleDisplay key={index} noble={noble} />
            ))}
            {player.nobles.length === 0 && (
              <Typography variant={"body1"}>
                <PlayerName playerName={playerName} /> does not have any nobles
                yet.
              </Typography>
            )}
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} gap={2}>
            {player.cards.map((card, index) => (
              <CardDisplay card={card} enabled={false} key={index} />
            ))}
            {player.cards.length === 0 && (
              <Typography variant={"body1"}>
                <PlayerName playerName={playerName} /> does not have any cards
                yet.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export const PlayerName: React.FC<{ playerName: string }> = ({
  playerName,
}) => (
  <Typography display={"inline"} fontWeight={600} variant={"body1"}>
    {playerName}
  </Typography>
);
