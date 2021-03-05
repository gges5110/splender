import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Card, Noble, Player } from "./Interfaces";
import { GameState } from "./App";

const gemsInHandLimit = 10;

export const pick = (G: GameState, ctx: Ctx, gems: number[]) => {
  for (let i = 0; i < gems.length; ++i) {
    if (G.gems[i] < gems[i]) {
      return INVALID_MOVE;
    }
    G.gems[i] -= gems[i];
    G.players[Number(ctx.currentPlayer)].gems[i] += gems[i];
  }

  const totalCount = G.players[Number(ctx.currentPlayer)].gems.reduce(
    (p, c) => p + c,
    0
  );

  if (totalCount > gemsInHandLimit) {
    ctx.events?.setStage?.({ stage: "DiscardGems" });
  } else {
    ctx.events?.pass?.();
  }
};

const replenishCards = (G: GameState, level: number, cardIdx: number) => {
  if (G.cardsInDeck[level].length > 0) {
    G.cardsInDeck[level].splice(0, 1);
    G.cardsOnTable[level][cardIdx] = G.cardsInDeck[level][0];
  } else {
    G.cardsOnTable[level][cardIdx] = undefined;
  }
};

export const build = (
  G: GameState,
  ctx: Ctx,
  level: number,
  cardIdx: number
) => {
  const card = G.cardsOnTable[level][cardIdx];
  if (purchaseDevelopmentCard(G, ctx, card) === INVALID_MOVE) {
    return INVALID_MOVE;
  }

  replenishCards(G, level, cardIdx);

  nobleVisits(G, ctx);
};

export const buildFromReserve = (G: GameState, ctx: Ctx, cardIdx: number) => {
  const card = G.players[Number(ctx.currentPlayer)].reservedCards[cardIdx];
  if (purchaseDevelopmentCard(G, ctx, card) === INVALID_MOVE) {
    return INVALID_MOVE;
  }

  G.players[Number(ctx.currentPlayer)].reservedCards.splice(cardIdx, 1);

  nobleVisits(G, ctx);
};

const nobleVisits = (G: GameState, ctx: Ctx) => {
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
    ctx.events?.setStage?.({ stage: "PickNoble" });
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

const purchaseDevelopmentCard = (G: GameState, ctx: Ctx, card?: Card) => {
  let goldCount = G.players[Number(ctx.currentPlayer)].gems[5];
  if (card === undefined) {
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

export const reserve = (
  G: GameState,
  ctx: Ctx,
  level: number,
  cardIdx: number
) => {
  if (G.players[Number(ctx.currentPlayer)].reservedCards.length >= 3) {
    return INVALID_MOVE;
  }

  const card = G.cardsOnTable[level][cardIdx];
  if (card === undefined) {
    return INVALID_MOVE;
  }

  G.players[Number(ctx.currentPlayer)].reservedCards.push(card);
  G.players[Number(ctx.currentPlayer)].gems[5]++;
  G.gems[5]--;
  replenishCards(G, level, cardIdx);

  const totalCount = G.players[Number(ctx.currentPlayer)].gems
    .slice(0, 5)
    .reduce((p, c) => p + c, 0);
  if (totalCount > 10) {
    ctx.events?.setStage?.({ stage: "DiscardGems" });
  } else {
    ctx.events?.pass?.();
  }
};

export const pickNoble = (G: GameState, ctx: Ctx, index: number) => {
  const noble = G.nobles[index];
  G.players[Number(ctx.currentPlayer)].nobles.push(noble);
  G.nobles.splice(index, 1);
};

export const discardGems = (G: GameState, ctx: Ctx, gems: number[]) => {
  const totalCount = G.players[Number(ctx.currentPlayer)].gems
    .slice(0, 5)
    .reduce((p, c) => p + c, 0);

  const totalGemsToDiscard = gems.reduce((p, c) => p + c, 0);

  if (totalCount - totalGemsToDiscard > gemsInHandLimit) {
    return INVALID_MOVE;
  }

  for (let i = 0; i < 5; ++i) {
    G.players[Number(ctx.currentPlayer)].gems[i] -= gems[i];
    G.gems[i] += gems[i];
  }
};
