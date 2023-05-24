import { Card, GameState } from "../../../Interfaces";
import { DiscardGemsDialog } from "./GemsSection/DiscardGemsDialog/DiscardGemsDialog";
import { Ctx } from "boardgame.io";
import { FC, useState } from "react";
import { PickNobleDialog } from "./NoblesSection/PickNobleDialog/PickNobleDialog";
import { NoblesSection } from "./NoblesSection/NoblesSection";
import { CardsSection } from "./CardsSection/CardsSection";
import { GemsSection } from "./GemsSection/GemsSection";

interface PlayingTableProps {
  G: GameState;
  ctx: Ctx;
  moves: Record<string, (...args: any[]) => void>;
  playerID: string | null;
}

export interface BuildDialogProps {
  level: number;
  index: number;
  card: Card;
}

export const PlayingTable: FC<PlayingTableProps> = ({
  G,
  ctx,
  moves,
  playerID,
}) => {
  const { nobles, cardsOnTable, cardsInDeck, gems, players } = G;
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [buildDialogProps, setBuildDialogProps] = useState<
    BuildDialogProps | undefined
  >(undefined);

  const closeBuildDialog = () => {
    setDialogOpen(false);
  };

  const currentPlayerActive = playerID === ctx.currentPlayer;

  return (
    <div className={"sections-container"}>
      <div className={"playing-table-subsections-container"}>
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
      </div>

      <div className={"playing-table-subsections-container"}>
        <CardsSection
          build={moves.build}
          buildDialogProps={buildDialogProps}
          cards={cardsOnTable}
          cardsInDeck={cardsInDeck}
          closeDialog={closeBuildDialog}
          dialogOpen={dialogOpen}
          hideAffordableHint={!currentPlayerActive}
          onClick={(buildDialogProps) => {
            setDialogOpen(true);
            setBuildDialogProps(buildDialogProps);
          }}
          player={players[Number(ctx.currentPlayer)]}
          reserve={moves.reserve}
        />
      </div>

      <div className={"playing-table-subsections-container"}>
        <GemsSection gems={gems} onSelect={moves.pick} />

        <DiscardGemsDialog
          discardGems={moves.discardGems}
          open={
            ctx.activePlayers?.[Number(ctx.currentPlayer)] === "DiscardGems" &&
            currentPlayerActive
          }
          playerGems={players[Number(ctx.currentPlayer)].gems}
        />
      </div>
    </div>
  );
};
