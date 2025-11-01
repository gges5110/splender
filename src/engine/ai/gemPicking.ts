import { GameState, Player } from "src/shared/types";
import { getGemNeeds } from "./scoring";
import { permute } from "./utils";

export interface ScoredGemMove {
  args: number[];
  move: string;
  score: number;
}

/**
 * Generates all possible gem picking moves with scores
 * Prioritizes picking more gems and needed colors
 */
export const generateGemMoves = (
  G: GameState,
  player: Player
): ScoredGemMove[] => {
  const gems = G.gems.slice(0, 5);
  const gemNeeds = getGemNeeds(G, player);
  const scoredGemMoves: ScoredGemMove[] = [];

  // Pick 3 different gems - prioritize combinations with highest gem needs
  const permutations: number[][] = permute(gems);

  // Check if we can pick 3 gems
  const has3GemMoves = permutations.some(
    (p) => p.reduce((sum, count) => sum + count, 0) === 3
  );

  permutations.forEach((p) => {
    const gemCount = p.reduce((sum, count) => sum + count, 0);

    // If we can pick 3 gems, skip moves with fewer gems from permutations
    if (has3GemMoves && gemCount < 3) {
      return;
    }

    // Calculate score based on gem needs
    let gemNeedScore = 0;
    for (let i = 0; i < 5; i++) {
      if (p[i] > 0) {
        gemNeedScore += gemNeeds[i] * p[i];
      }
    }

    // Heavily prioritize picking more gems - use 100000 multiplier per gem
    // This ensures 3-gem picks ALWAYS rank higher than 2-gem or 1-gem picks
    const score = gemCount * 100000 + gemNeedScore;

    scoredGemMoves.push({
      args: p,
      move: "pick",
      score,
    });
  });

  // Only add "pick 2 of same" moves if we can't pick 3 different gems
  if (!has3GemMoves) {
    // Pick 2 gems of same kind - prefer colors we need most
    // Give a 10000 point bonus for picking 2 of same vs 2 different (better strategy)
    gems.forEach((gem, index) => {
      if (gem > 3) {
        const arr: number[] = Array(5).fill(0);
        arr[index] = 2;
        scoredGemMoves.push({
          args: arr,
          move: "pick",
          score: 210000 + gemNeeds[index] * 2,
        });
      }
    });
  }

  // Sort by score (highest first)
  scoredGemMoves.sort((a, b) => b.score - a.score);

  return scoredGemMoves;
};
