import { AiEnumerate, Ctx } from "boardgame.io";
import { GameState } from "src/shared/types";
import { getScoredAffordableCards } from "./scoring";
import { generateGemMoves } from "./gemPicking";
import {
  calculateGemsToDiscard,
  selectMoveWithVariety,
  reserveCards,
} from "./utils";
import { getTotalCount } from "src/engine/MovesUtil";
import { gemsInHandLimit } from "src/engine/Moves";

/**
 * Main AI move enumeration function
 * Returns exactly one best move for the current game state
 *
 * Decision priority order:
 * 1. Discard gems if over the hand limit (forced action)
 * 2. Pick a noble if required (forced action)
 * 3. Build an affordable card (prioritized by score: points, bonuses, noble progress)
 * 4. Reserve a card if at 9 gems (avoid hitting the limit)
 * 5. Pick gems (prioritize 3 > 2 same color > 2 different, weighted by card needs)
 * 6. Reserve a card (fallback)
 * 7. End turn (if no other moves available)
 */
export const enumerateAIMoves = (G: GameState, ctx: Ctx): AiEnumerate => {
  const moves: AiEnumerate = [];
  const currentPlayer = G.players[Number(ctx.currentPlayer)];

  // 1. Discard gems if over the hand limit (forced action)
  if (
    ctx.activePlayers != null &&
    ctx.activePlayers[Number(ctx.currentPlayer)] === "DiscardGems"
  ) {
    const discardingGems = calculateGemsToDiscard(currentPlayer.gems);
    return [
      {
        move: "discardGems",
        args: [discardingGems],
      },
    ];
  }

  // 2. Pick a noble if required (forced action)
  if (
    ctx.activePlayers != null &&
    ctx.activePlayers[Number(ctx.currentPlayer)] === "PickNoble"
  ) {
    // TODO: smarter noble pick
    return [
      {
        move: "pickNoble",
        args: [0],
      },
    ];
  }

  // 3. Build an affordable card (prioritized by score: points, bonuses, noble progress)
  const scoredCards = getScoredAffordableCards(G, currentPlayer);

  if (scoredCards.length > 0) {
    // Select one card from competitive options (within 5% of best score)
    const selectedCard = selectMoveWithVariety(scoredCards);

    if (selectedCard) {
      if (
        selectedCard.rowIndex !== undefined &&
        selectedCard.columnIndex !== undefined
      ) {
        return [
          {
            move: "build",
            args: [selectedCard.rowIndex, selectedCard.columnIndex],
          },
        ];
      } else if (selectedCard.reserveIndex !== undefined) {
        return [
          {
            move: "buildFromReserve",
            args: [selectedCard.reserveIndex],
          },
        ];
      }
    }
  }

  // 4. Reserve a card if at 9 gems (avoid hitting the limit)
  if (getTotalCount(currentPlayer.gems) >= gemsInHandLimit - 1) {
    reserveCards(G, moves);

    if (moves.length > 0) {
      return moves;
    }
  }

  // 5. Pick gems (prioritize 3 > 2 same color > 2 different, weighted by card needs)
  const scoredGemMoves = generateGemMoves(G, currentPlayer);

  if (scoredGemMoves.length > 0) {
    // Select one gem combination from competitive options (within 5% of best score)
    const selectedMove = selectMoveWithVariety(scoredGemMoves);

    if (selectedMove) {
      return [
        {
          args: [selectedMove.args],
          move: selectedMove.move,
        },
      ];
    }
  }

  // 6. Reserve a card (fallback)
  reserveCards(G, moves);

  // 7. End turn (if no other moves available)
  if (moves.length === 0) {
    moves.push({ event: "endTurn" });
  }
  return moves;
};
