import { Card, GameState } from "../../Interfaces";
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
    <div
      className={"rounded-xl sm:bg-slate-100 sm:shadow-xl sm:p-8 flex flex-col"}
    >
      <div className={"p-1 sm:p-4"}>
        <NoblesSection nobles={nobles} />

        <PickNobleDialog
          open={
            ctx.activePlayers?.[Number(ctx.currentPlayer)] === "PickNoble" &&
            currentPlayerActive
          }
          players={players}
          nobles={nobles}
          currentPlayer={ctx.currentPlayer}
          pick={(index) => {
            moves.pickNoble(index);
          }}
        />
      </div>

      <div className={"p-1 sm:p-4"}>
        <CardsSection
          dialogOpen={dialogOpen}
          closeDialog={closeBuildDialog}
          buildDialogProps={buildDialogProps}
          player={players[Number(ctx.currentPlayer)]}
          build={moves.build}
          reserve={moves.reserve}
          cards={cardsOnTable}
          cardsInDeck={cardsInDeck}
          onClick={(buildDialogProps) => {
            setDialogOpen(true);
            setBuildDialogProps(buildDialogProps);
          }}
          hideAffordableHint={!currentPlayerActive}
        />
      </div>

      <div className={"p-1 sm:p-4"}>
        <GemsSection gems={gems} onSelect={moves.pick} />

        <DiscardGemsDialog
          open={
            ctx.activePlayers?.[Number(ctx.currentPlayer)] === "DiscardGems" &&
            currentPlayerActive
          }
          playerGems={players[Number(ctx.currentPlayer)].gems}
          discardGems={moves.discardGems}
        />
      </div>
    </div>
  );
};
