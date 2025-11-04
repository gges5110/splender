import { AiEnumerate } from "boardgame.io";
import { getTotalCount } from "src/engine/MovesUtil";
import { gemsInHandLimit } from "src/engine/Moves";
import { GameState } from "src/shared/types";

/**
 * Calculates which gems to discard when over the hand limit
 * Discards one gem at a time from any available color
 */
export const calculateGemsToDiscard = (playerGems: number[]): number[] => {
  let diff = getTotalCount(playerGems) - gemsInHandLimit;
  const discardingGems = playerGems.map((gem) => {
    if (gem > 0 && diff > 0) {
      diff--;
      return 1;
    } else {
      return 0;
    }
  });
  return discardingGems;
};

/**
 * Selects a single move from scored options using weighted randomness
 * Moves within 1% of the best score have equal chance, creating variety
 * while still being competitive
 */
export const selectMoveWithVariety = <T extends { score: number }>(
  scoredMoves: T[]
): T | undefined => {
  if (scoredMoves.length === 0) return undefined;

  const bestScore = scoredMoves[0].score;
  const scoreThreshold = bestScore * 0.99; // Changed from 0.95 to 0.99 for tighter selection

  // Get all competitive moves (within 1% of best)
  const competitiveMoves = scoredMoves.filter(
    (move) => move.score >= scoreThreshold
  );

  // Randomly select one of the competitive moves
  const randomIndex = Math.floor(Math.random() * competitiveMoves.length);
  return competitiveMoves[randomIndex];
};

/**
 * Generates all possible gem permutations for picking up to 3 different gems
 */
export const permute = (gems: number[]): number[][] => {
  const perm: number[] = [],
    perms: number[][] = [];
  const p = (count: number) => {
    if (perm.length === 5) {
      if (perm.some((g) => g === 1)) {
        perms.push([...perm]);
      }

      return;
    }

    if (count < 3 && gems[perm.length] > 0) {
      perm.push(1);
      p(count + 1);
      perm.pop();
    }

    perm.push(0);
    p(count);
    perm.pop();
  };
  p(0);

  return perms;
};

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 */
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Adds reserve card moves to the moves array and shuffles them
 */
export const reserveCards = (G: GameState, moves: AiEnumerate): void => {
  G.cardsOnTable.forEach((cardsAtLevel, rowIndex) => {
    cardsAtLevel.forEach((card, columnIndex) => {
      if (card !== undefined) {
        moves.push({
          move: "reserve",
          args: [rowIndex, columnIndex],
        });
      }
    });
  });
  shuffleArray(moves);
};
