import { AiEnumerate, Ctx } from "boardgame.io";
import { Card, GameState, Noble, Player } from "src/interfaces/Interfaces";
import { gemsInHandLimit } from "./Moves";
import {
  getCardCountByColor,
  getTotalCount,
  playerCanAffordCard,
} from "./MovesUtil";

export const enumerateAIMoves = (G: GameState, ctx: Ctx): AiEnumerate => {
  const moves: AiEnumerate = [];
  const currentPlayer = G.players[Number(ctx.currentPlayer)];

  // discard
  if (
    ctx.activePlayers != null &&
    ctx.activePlayers[Number(ctx.currentPlayer)] === "DiscardGems"
  ) {
    let diff = getTotalCount(currentPlayer.gems) - gemsInHandLimit;
    const discardingGems = currentPlayer.gems.map((gem) => {
      if (gem > 0 && diff > 0) {
        diff--;
        return 1;
      } else {
        return 0;
      }
    });
    return [
      {
        move: "discardGems",
        args: [discardingGems],
      },
    ];
  }

  // pick noble
  if (
    ctx.activePlayers != null &&
    ctx.activePlayers[Number(ctx.currentPlayer)] === "PickNoble"
  ) {
    return [
      {
        move: "pickNoble",
        args: [0],
      },
    ];
  }

  // IMPROVED: Use smart card building - prioritize high-value cards
  const scoredCards = getScoredAffordableCards(G, currentPlayer);
  scoredCards.forEach((scoredCard) => {
    if (
      scoredCard.rowIndex !== undefined &&
      scoredCard.columnIndex !== undefined
    ) {
      moves.push({
        move: "build",
        args: [scoredCard.rowIndex, scoredCard.columnIndex],
      });
    } else if (scoredCard.reserveIndex !== undefined) {
      moves.push({
        move: "buildFromReserve",
        args: [scoredCard.reserveIndex],
      });
    }
  });

  if (moves.length > 0) {
    return moves;
  }

  // if user has 9 gems, they should reserve card rather than picking gems
  if (getTotalCount(currentPlayer.gems) >= gemsInHandLimit - 1) {
    reserveCards(G, moves);

    if (moves.length > 0) {
      return moves;
    }
  }

  // IMPROVED: Smart gem picking based on what cards we want to buy
  const gems = G.gems.slice(0, 5);
  const gemNeeds = getGemNeeds(G, currentPlayer);

  // Create scored gem moves
  interface ScoredGemMove {
    args: number[];
    move: string;
    score: number;
  }
  const scoredGemMoves: ScoredGemMove[] = [];

  // Pick 2 gems of same kind - prefer colors we need most
  gems.forEach((gem, index) => {
    if (gem > 3) {
      const arr: number[] = Array(5).fill(0);
      arr[index] = 2;
      scoredGemMoves.push({
        args: arr,
        move: "pick",
        score: gemNeeds[index] * 2,
      });
    }
  });

  // Pick 3 different gems - prioritize combinations with highest gem needs
  const permutations: number[][] = permute(gems);
  permutations.forEach((p) => {
    // Calculate score based on gem needs
    let score = 0;
    for (let i = 0; i < 5; i++) {
      if (p[i] > 0) {
        score += gemNeeds[i] * p[i];
      }
    }

    scoredGemMoves.push({
      args: p,
      move: "pick",
      score,
    });
  });

  // Sort by score (highest first) and add to moves
  scoredGemMoves.sort((a, b) => b.score - a.score);
  scoredGemMoves.forEach((scoredMove) => {
    moves.push({
      args: [scoredMove.args],
      move: scoredMove.move,
    });
  });
  if (moves.length > 0) {
    return moves;
  }

  // reserve
  reserveCards(G, moves);

  if (moves.length === 0) {
    moves.push({ event: "endTurn" });
  }
  return moves;
};

// Removed old buildCard and pickNobles functions - now using smart card scoring in enumerateAIMoves

const reserveCards = (G: GameState, moves: AiEnumerate): void => {
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

const permute = (gems: number[]): number[][] => {
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

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ============= CARD SCORING SYSTEM =============

interface CardScore {
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
const scoreCard = (card: Card, player: Player, nobles: Noble[]): number => {
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
const getScoredAffordableCards = (
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
const getGemNeeds = (G: GameState, player: Player): number[] => {
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
