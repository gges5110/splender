import { Card, GameState, Noble, Player } from "../Interfaces";
import { Ctx } from "boardgame.io";
import { playerCanAffordCard } from "../components/PlayingTable/CardDialog/CardDialog";
import { INVALID_MOVE } from "boardgame.io/core";
import { gemsInHandLimit, pickNoble } from "./Moves";

export const replenishCards = (
  G: GameState,
  level: number,
  cardIdx: number
) => {
  if (G.cardsInDeck[level].length > 0) {
    G.cardsInDeck[level].splice(0, 1);
    G.cardsOnTable[level][cardIdx] = G.cardsInDeck[level][0];
  } else {
    G.cardsOnTable[level][cardIdx] = undefined;
  }
};

export const nobleVisits = (G: GameState, ctx: Ctx) => {
  // Check noble visits
  const visitingNobleIndexArray: number[] = getVisitingNobleIndexArray(
    G.players[Number(ctx.currentPlayer)],
    G.nobles
  );

  if (visitingNobleIndexArray.length === 0) {
    ctx.events?.pass?.();
  } else if (visitingNobleIndexArray.length === 1) {
    pickNoble(G, ctx, visitingNobleIndexArray[0]);
    ctx.events?.pass?.();
  } else {
    ctx.events?.setStage?.("PickNoble");
  }
};

export const getVisitingNobleIndexArray = (
  player: Player,
  nobles: Noble[]
): number[] => {
  const playerCardCountByColors: number[] = Array(5).fill(0);
  player.cards.forEach((card) => {
    playerCardCountByColors[card.color]++;
  });
  const visitingNobleIndexArray: number[] = [];
  nobles.forEach((noble, index) => {
    if (
      noble.cardCountByColors.every(
        (count, index) => playerCardCountByColors[index] >= count
      )
    ) {
      visitingNobleIndexArray.push(index);
    }
  });
  return visitingNobleIndexArray;
};

export const purchaseDevelopmentCard = (
  G: GameState,
  ctx: Ctx,
  card?: Card
) => {
  let goldCount = G.players[Number(ctx.currentPlayer)].gems[5];
  if (
    card === undefined ||
    !playerCanAffordCard(card, G.players[Number(ctx.currentPlayer)])
  ) {
    return INVALID_MOVE;
  }

  for (let i = 0; i < 5; ++i) {
    if (card.cost[i] === 0) {
      continue;
    }

    const bonuses = G.players[Number(ctx.currentPlayer)].cards.filter(
      (card: Card) => card.color === i
    ).length;

    // Cost must be non negative
    const costMinusBonuses = Math.max(0, card.cost[i] - bonuses);

    if (costMinusBonuses <= 0) {
      continue;
    }

    // Debt must be non negative
    const debt = Math.max(
      0,
      costMinusBonuses - G.players[Number(ctx.currentPlayer)].gems[i]
    );
    if (debt > 0) {
      if (goldCount >= debt) {
        goldCount -= debt;

        // Pay with Gold
        G.players[Number(ctx.currentPlayer)].gems[5] -= debt;
        G.gems[5] += debt;
      } else {
        return INVALID_MOVE;
      }
    }

    G.players[Number(ctx.currentPlayer)].gems[i] -= costMinusBonuses - debt;
    G.gems[i] += costMinusBonuses - debt;
  }

  G.players[Number(ctx.currentPlayer)].cards.push(card);
};

export const considerTriggerDiscardPhase = (G: GameState, ctx: Ctx) => {
  const totalCount = getTotalCount(G.players[Number(ctx.currentPlayer)].gems);
  if (totalCount > gemsInHandLimit) {
    ctx.events?.setStage?.("DiscardGems");
  } else {
    ctx.events?.pass?.();
  }
};

export const getTotalCount = (array: number[]): number => {
  return array.reduce((p, c) => p + c, 0);
};
