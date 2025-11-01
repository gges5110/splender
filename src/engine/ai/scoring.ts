import { Card, GameState, Noble, Player } from "src/shared/types";
import {
  getCardCountByColor,
  getTotalCount,
  playerCanAffordCard,
} from "src/engine/MovesUtil";

export interface CardScore {
  card: Card;
  columnIndex?: number;
  reserveIndex?: number;
  rowIndex?: number;
  score: number;
}

/**
 * Scores a card based on its value to the player
 * Higher score = more valuable
 */
export const scoreCard = (
  card: Card,
  player: Player,
  nobles: Noble[]
): number => {
  let score = 0;

  // 1. Victory points are highly valuable
  score += card.points * 10;

  // 2. Bonus color value - cards that give bonuses help purchase future cards
  // Each bonus is worth something, more valuable early game
  const totalPlayerCards = player.cards.length;
  const bonusValue = Math.max(3, 8 - totalPlayerCards * 0.3);
  score += bonusValue;

  // 3. Progress toward nobles - check if this card's color helps reach any noble
  const playerCardsByColor = getCardCountByColor(player.cards);
  nobles.forEach((noble) => {
    if (noble.acquired) return;

    // Only consider non-gold cards (colors 0-4) for noble requirements
    const cardColor = card.color;
    if (cardColor >= 0 && cardColor < 5) {
      const requiredCount =
        noble.cardCountByColors[cardColor as 0 | 1 | 2 | 3 | 4];
      if (requiredCount && requiredCount > 0) {
        const currentCount = playerCardsByColor[cardColor];

        // If we need this color for a noble, add value
        if (currentCount < requiredCount) {
          // More valuable if we're close to completing the noble
          const progressToNoble = noble.cardCountByColors.reduce(
            (sum, required, colorIndex) => {
              const have = playerCardsByColor[colorIndex];
              return sum + Math.min(have, required);
            },
            0
          );
          const totalRequired = getTotalCount(noble.cardCountByColors);
          const nobleProgress = progressToNoble / totalRequired;

          score += 5 * nobleProgress; // Up to 5 points for noble progress
        }
      }
    }
  });

  // 4. Color balance - slightly prefer colors we have fewer of (engine building)
  const colorCounts = getCardCountByColor(player.cards);
  const avgColorCount = colorCounts.reduce((a, b) => a + b, 0) / 5;
  const colorDeficit = Math.max(0, avgColorCount - colorCounts[card.color]);
  score += colorDeficit * 0.5;

  return score;
};

/**
 * Gets all affordable cards sorted by score (highest first)
 */
export const getScoredAffordableCards = (
  G: GameState,
  player: Player
): CardScore[] => {
  const scoredCards: CardScore[] = [];

  // Score cards on table
  G.cardsOnTable.forEach((cardsAtLevel, rowIndex) => {
    cardsAtLevel.forEach((card, columnIndex) => {
      if (card !== undefined && playerCanAffordCard(card, player)) {
        const score = scoreCard(card, player, G.nobles);
        scoredCards.push({ card, score, rowIndex, columnIndex });
      }
    });
  });

  // Score reserved cards
  player.reservedCards.forEach((card, reserveIndex) => {
    if (playerCanAffordCard(card, player)) {
      const score = scoreCard(card, player, G.nobles);
      scoredCards.push({ card, score, reserveIndex });
    }
  });

  // Sort by score descending (highest score first)
  scoredCards.sort((a, b) => b.score - a.score);

  return scoredCards;
};

/**
 * Calculates which gems would be most useful for purchasing valuable cards
 */
export const getGemNeeds = (G: GameState, player: Player): number[] => {
  const gemNeeds = [0, 0, 0, 0, 0]; // Need score for each color

  // Get all cards on table and in reserve
  const allCards: Card[] = [];
  G.cardsOnTable.forEach((cardsAtLevel) => {
    cardsAtLevel.forEach((card) => {
      if (card !== undefined) allCards.push(card);
    });
  });
  player.reservedCards.forEach((card) => allCards.push(card));

  // Score each card and calculate gem needs weighted by card value
  allCards.forEach((card) => {
    const cardValue = scoreCard(card, player, G.nobles);
    const playerBonuses = getCardCountByColor(player.cards);

    // Calculate how many gems needed for each color
    for (let i = 0; i < 5; i++) {
      const costAfterBonuses = Math.max(0, card.cost[i] - playerBonuses[i]);
      const gemsNeeded = Math.max(0, costAfterBonuses - player.gems[i]);

      if (gemsNeeded > 0) {
        // Weight gem need by card value and urgency
        gemNeeds[i] += gemsNeeded * cardValue;
      }
    }
  });

  return gemNeeds;
};
