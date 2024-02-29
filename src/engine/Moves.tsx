import type { Ctx, MoveFn } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GameState } from "../interfaces/Interfaces";
import {
  considerTriggerDiscardPhase,
  getCardCountByColor,
  getTotalCount,
  nobleVisits,
  purchaseDevelopmentCard,
  replenishCards,
} from "./MovesUtil";

export const gemsInHandLimit = 10;

export const pick: MoveFn<GameState> = (
  G: GameState,
  ctx: Ctx,
  gems: number[]
) => {
  for (let i = 0; i < gems.length; ++i) {
    if (G.gems[i] < gems[i]) {
      return INVALID_MOVE;
    }
    G.gems[i] -= gems[i];
    G.players[Number(ctx.currentPlayer)].gems[i] += gems[i];
  }

  considerTriggerDiscardPhase(G, ctx);
};

export const build: MoveFn<GameState> = (
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

export const reserve: MoveFn<GameState> = (
  G: GameState,
  ctx: Ctx,
  level: number,
  cardIdx: number
) => {
  if (G.players[Number(ctx.currentPlayer)].reservedCards.length >= 3) {
    return INVALID_MOVE;
  }

  const reserveFromDeck = cardIdx < 0;

  const card = !reserveFromDeck
    ? G.cardsOnTable[level][cardIdx]
    : G.cardsInDeck[level][0];
  if (card === undefined) {
    return INVALID_MOVE;
  }

  G.players[Number(ctx.currentPlayer)].reservedCards.push(card);

  // Only hand out gold gem when available
  if (G.gems[5] > 0) {
    G.players[Number(ctx.currentPlayer)].gems[5]++;
    G.gems[5]--;
    considerTriggerDiscardPhase(G, ctx);
  }

  replenishCards(G, level, cardIdx);
};

export const pickNoble: MoveFn<GameState> = (
  G: GameState,
  ctx: Ctx,
  index: number
) => {
  const noble = G.nobles[index];

  // Check if player is eligible
  const playerCards = G.players[Number(ctx.currentPlayer)].cards;
  const cardCountByColors: number[] = getCardCountByColor(playerCards);
  for (let i = 0; i < noble.cardCountByColors.length; i++) {
    if (noble.cardCountByColors[i] > cardCountByColors[i]) {
      return INVALID_MOVE;
    }
  }

  G.players[Number(ctx.currentPlayer)].nobles.push(noble);
  G.nobles[index].acquired = true;
};

export const discardGems: MoveFn<GameState> = (
  G: GameState,
  ctx: Ctx,
  gems: number[]
) => {
  const totalCount = getTotalCount(G.players[Number(ctx.currentPlayer)].gems);

  const totalGemsToDiscard = getTotalCount(gems);

  // Check if player discards down to limit
  if (totalCount - totalGemsToDiscard > gemsInHandLimit) {
    return INVALID_MOVE;
  }
  // Check if discard is needed
  if (totalCount <= gemsInHandLimit) {
    return INVALID_MOVE;
  }

  // Check if player has sufficient gems
  for (let i = 0; i < 5; ++i) {
    if (G.players[Number(ctx.currentPlayer)].gems[i] < gems[i]) {
      return INVALID_MOVE;
    }
  }

  for (let i = 0; i < 5; ++i) {
    G.players[Number(ctx.currentPlayer)].gems[i] -= gems[i];
    G.gems[i] += gems[i];
  }
};
