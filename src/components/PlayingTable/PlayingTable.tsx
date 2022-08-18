import { Card, GameState } from "../../Interfaces";
import { NobleDisplay } from "../Shared/NobleDisplay/NobleDisplay";
import { DiscardGemsDialog } from "./DiscardGemsDialog/DiscardGemsDialog";
import { CardDialog } from "./CardDialog/CardDialog";
import { CardsOnTable } from "./CardsOnTable/CardsOnTable";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";
import { Ctx } from "boardgame.io";
import { FC, useState } from "react";
import { PickNobleDialog } from "./PickNobleDialog/PickNobleDialog";

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
    <div className={"rounded-xl bg-slate-100 shadow-xl p-8"}>
      <div className={"p-4"}>
        <span className={"title"}>Nobles</span>
        <div className={"flex justify-between"}>
          {nobles.map((noble, index) => (
            <NobleDisplay noble={noble} key={index} />
          ))}
        </div>
      </div>

      <div className={"p-4 mx-auto"}>
        <CardDialog
          open={dialogOpen}
          closeDialog={closeBuildDialog}
          buildDialogProps={buildDialogProps}
          player={players[Number(ctx.currentPlayer)]}
          build={moves.build}
          reserve={moves.reserve}
        />
        <span className={"title"}>Cards</span>
        <CardsOnTable
          cards={cardsOnTable}
          player={players[Number(ctx.currentPlayer)]}
          cardsInDeck={cardsInDeck}
          onClick={(buildDialogProps) => {
            setDialogOpen(true);
            setBuildDialogProps(buildDialogProps);
          }}
          hideAffordableHint={!currentPlayerActive}
        />
      </div>

      <div className={"p-4"}>
        <span className={"title"}>Gems</span>
        <div>
          <GemsPicker
            gems={gems}
            onSelect={moves.pick}
            mode={GemsPickerMode.PICK}
          />
        </div>
      </div>

      <DiscardGemsDialog
        open={
          ctx.activePlayers?.[Number(ctx.currentPlayer)] === "DiscardGems" &&
          currentPlayerActive
        }
        playerGems={players[Number(ctx.currentPlayer)].gems}
        discardGems={moves.discardGems}
      />

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
  );
};
