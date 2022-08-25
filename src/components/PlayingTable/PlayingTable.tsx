import { Card, GameState } from "../../Interfaces";
import { DiscardGemsDialog } from "./DiscardGemsDialog/DiscardGemsDialog";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";
import { Ctx } from "boardgame.io";
import { FC, useState } from "react";
import { PickNobleDialog } from "./NoblesSection/PickNobleDialog/PickNobleDialog";
import { Button } from "../Shared/Button";
import { NoblesSection } from "./NoblesSection/NoblesSection";
import { CardsSection } from "./CardsSection/CardsSection";

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
  const [showNobles, setShowNobles] = useState<boolean>(true);
  const closeBuildDialog = () => {
    setDialogOpen(false);
  };

  const currentPlayerActive = playerID === ctx.currentPlayer;

  return (
    <div className={"rounded-xl bg-slate-100 shadow-xl p-4 sm:p-8"}>
      <div className={"p-1 sm:p-4"}>
        <div className={"flex justify-between gap-2 items-center"}>
          <span className={"title"}>Nobles</span>
          <Button
            onClick={() => {
              setShowNobles(!showNobles);
            }}
          >
            {showNobles ? "Hide" : "Show"} Nobles
          </Button>
        </div>

        <NoblesSection nobles={nobles} isVisible={showNobles} />

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

      <div className={"p-1 sm:p-4 mx-auto"}>
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
        <span className={"title"}>Gems</span>
        <div>
          <GemsPicker
            gems={gems}
            onSelect={moves.pick}
            mode={GemsPickerMode.PICK}
          />
        </div>

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
