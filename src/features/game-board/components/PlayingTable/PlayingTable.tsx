import { Card, GameState } from "src/shared/types";
import { DiscardGemsDialog } from "./GemsSection/DiscardGemsDialog/DiscardGemsDialog";
import { Ctx } from "boardgame.io";
import { FC, useState } from "react";
import { PickNobleDialog } from "./NoblesSection/PickNobleDialog/PickNobleDialog";
import { NoblesSection } from "./NoblesSection/NoblesSection";
import { CardsSection } from "./CardsSection/CardsSection";
import { GemsSection } from "./GemsSection/GemsSection";
import { Paper, Box } from "@mui/material";

interface PlayingTableProps {
  G: GameState;
  ctx: Ctx;
  moves: Record<string, (...args: any[]) => void>;
  playerID: string | null;
}

export interface BuildDialogProps {
  card: Card;
  index: number;
  level: number;
}

export const PlayingTable: FC<PlayingTableProps> = ({
  G,
  ctx,
  moves,
  playerID,
}) => {
  const { nobles, cardsOnTable, numCardsInDeck, gems, players } = G;
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [buildDialogProps, setBuildDialogProps] = useState<
    BuildDialogProps | undefined
  >(undefined);

  const closeBuildDialog = () => {
    setDialogOpen(false);
  };

  const currentPlayerActive = playerID === ctx.currentPlayer;

  return (
    <Paper
      elevation={6}
      sx={{
        mx: "auto",
        height: "100%",
        borderRadius: 3,
        p: { xs: 1, sm: 4 },
        boxShadow: {
          sm:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <Box sx={{ p: { xs: 0.5, sm: 2 } }}>
        <NoblesSection nobles={nobles} />

        <PickNobleDialog
          currentPlayer={ctx.currentPlayer}
          nobles={nobles}
          open={
            ctx.activePlayers?.[Number(ctx.currentPlayer)] === "PickNoble" &&
            currentPlayerActive
          }
          pick={(index) => {
            moves.pickNoble(index);
          }}
          players={players}
        />
      </Box>

      <Box sx={{ p: { xs: 0.5, sm: 2 } }}>
        <CardsSection
          build={moves.build}
          buildDialogProps={buildDialogProps}
          cards={cardsOnTable}
          closeDialog={closeBuildDialog}
          dialogOpen={dialogOpen}
          disabled={!currentPlayerActive}
          hideAffordableHint={!currentPlayerActive}
          numCardsInDeck={numCardsInDeck}
          onClick={(buildDialogProps) => {
            setDialogOpen(true);
            setBuildDialogProps(buildDialogProps);
          }}
          player={players[Number(ctx.currentPlayer)]}
          reserve={moves.reserve}
        />
      </Box>

      <Box sx={{ p: { xs: 0.5, sm: 2 } }}>
        <GemsSection
          disabled={!currentPlayerActive}
          gems={gems}
          onSelect={moves.pick}
        />

        <DiscardGemsDialog
          discardGems={moves.discardGems}
          open={
            ctx.activePlayers?.[Number(ctx.currentPlayer)] === "DiscardGems" &&
            currentPlayerActive
          }
          playerGems={players[Number(ctx.currentPlayer)].gems}
        />
      </Box>
    </Paper>
  );
};
