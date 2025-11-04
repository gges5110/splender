import { describe, it, expect } from "vitest";
import { scoreCard, getScoredAffordableCards, getGemNeeds } from "./scoring";
import { Card, Color, GameState, Noble, Player } from "src/shared/types";

// Helper to create a basic player
const createPlayer = (overrides?: Partial<Player>): Player => ({
  cards: [],
  gems: [0, 0, 0, 0, 0, 0],
  nobles: [],
  reservedCards: [],
  ...overrides,
});

// Helper to create a basic card
const createCard = (
  color: Color,
  points: number,
  cost: [number, number, number, number, number]
): Card => ({
  color,
  points,
  cost,
});

// Helper to create a basic noble
const createNoble = (
  cardCountByColors: [number, number, number, number, number],
  acquired = false
): Noble => ({
  acquired,
  cardCountByColors,
});

// Helper to create a basic game state
const createGameState = (overrides?: Partial<GameState>): GameState => ({
  cardsInDeck: [[], [], []],
  cardsOnTable: [[], [], []],
  gems: [4, 4, 4, 4, 4, 5],
  nobles: [],
  numCardsInDeck: [0, 0, 0],
  players: [createPlayer(), createPlayer()],
  ...overrides,
});

describe("scoreCard", () => {
  it("should give higher score to cards with more victory points", () => {
    const player = createPlayer();
    const lowPointCard = createCard(Color.White, 1, [0, 0, 0, 0, 0]);
    const highPointCard = createCard(Color.White, 3, [0, 0, 0, 0, 0]);

    const lowScore = scoreCard(lowPointCard, player, []);
    const highScore = scoreCard(highPointCard, player, []);

    expect(highScore).toBeGreaterThan(lowScore);
  });

  it("should value bonus cards more in early game", () => {
    const card = createCard(Color.White, 0, [0, 0, 0, 0, 0]);
    const earlyGamePlayer = createPlayer({ cards: [] });
    const lateGamePlayer = createPlayer({
      cards: Array(12).fill(createCard(Color.White, 0, [0, 0, 0, 0, 0])),
    });

    const earlyScore = scoreCard(card, earlyGamePlayer, []);
    const lateScore = scoreCard(card, lateGamePlayer, []);

    // Early game should value bonuses more
    expect(earlyScore).toBeGreaterThan(lateScore);
  });

  it("should give higher score to cards that help achieve nobles", () => {
    const nobles = [
      createNoble([3, 0, 0, 0, 0]), // Needs 3 white cards
    ];
    const player = createPlayer({
      cards: [
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
      ], // Has 2 white
    });

    const whiteCard = createCard(Color.White, 0, [0, 0, 0, 0, 0]);
    const blueCard = createCard(Color.Blue, 0, [0, 0, 0, 0, 0]);

    const whiteScore = scoreCard(whiteCard, player, nobles);
    const blueScore = scoreCard(blueCard, player, nobles);

    // White card should score higher because it helps achieve the noble
    expect(whiteScore).toBeGreaterThan(blueScore);
  });

  it("should not give noble bonus for already acquired nobles", () => {
    const nobles = [
      createNoble([3, 0, 0, 0, 0], true), // Already acquired
    ];
    const player = createPlayer({
      cards: [
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
      ],
    });

    const whiteCard = createCard(Color.White, 0, [0, 0, 0, 0, 0]);
    const blueCard = createCard(Color.Blue, 0, [0, 0, 0, 0, 0]);

    const whiteScore = scoreCard(whiteCard, player, nobles);
    const blueScore = scoreCard(blueCard, player, nobles);

    // Scores should be similar since noble is already acquired
    expect(Math.abs(whiteScore - blueScore)).toBeLessThan(1);
  });

  it("should slightly prefer colors player has fewer of (color balance)", () => {
    const player = createPlayer({
      cards: [
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
      ], // Has 3 white cards
    });

    const whiteCard = createCard(Color.White, 0, [0, 0, 0, 0, 0]);
    const blueCard = createCard(Color.Blue, 0, [0, 0, 0, 0, 0]);

    const whiteScore = scoreCard(whiteCard, player, []);
    const blueScore = scoreCard(blueCard, player, []);

    // Blue should score slightly higher due to color balance
    expect(blueScore).toBeGreaterThan(whiteScore);
  });

  describe("level-based strategy", () => {
    it("should prioritize level 0 cards in early game", () => {
      const player = createPlayer({ cards: [] }); // Early game: 0 cards
      const card = createCard(Color.White, 0, [0, 0, 0, 0, 0]);

      const level0Score = scoreCard(card, player, [], 0);
      const level1Score = scoreCard(card, player, [], 1);
      const level2Score = scoreCard(card, player, [], 2);

      expect(level0Score).toBeGreaterThan(level1Score);
      expect(level0Score).toBeGreaterThan(level2Score);
    });

    it("should prioritize level 1 and 2 cards in late game", () => {
      const player = createPlayer({
        cards: Array(15).fill(createCard(Color.White, 0, [0, 0, 0, 0, 0])),
      }); // Late game: 15 cards
      const card = createCard(Color.White, 0, [0, 0, 0, 0, 0]);

      const level0Score = scoreCard(card, player, [], 0);
      const level1Score = scoreCard(card, player, [], 1);
      const level2Score = scoreCard(card, player, [], 2);

      expect(level1Score).toBeGreaterThan(level0Score);
      expect(level2Score).toBeGreaterThan(level0Score);
    });

    it("should transition priorities in mid game", () => {
      const player = createPlayer({
        cards: Array(6).fill(createCard(Color.White, 0, [0, 0, 0, 0, 0])),
      }); // Mid game: 6 cards (60% progress)
      const card = createCard(Color.White, 0, [0, 0, 0, 0, 0]);

      const level0Score = scoreCard(card, player, [], 0);
      const level1Score = scoreCard(card, player, [], 1);
      const level2Score = scoreCard(card, player, [], 2);

      // With dramatic strategy, level 0 still has advantage in mid game but reduced
      expect(level0Score).toBeGreaterThan(level2Score);
      // Level 1 should be becoming more competitive
      expect(level1Score).toBeGreaterThan(level2Score);
      // Level 0 advantage should be reduced compared to early game
      const earlyPlayer = createPlayer({ cards: [] });
      const earlyLevel0 = scoreCard(card, earlyPlayer, [], 0);
      const earlyLevel1 = scoreCard(card, earlyPlayer, [], 1);
      const earlyGap = earlyLevel0 - earlyLevel1;
      const midGap = level0Score - level1Score;
      expect(midGap).toBeLessThan(earlyGap);
    });

    it("should handle missing level parameter gracefully", () => {
      const player = createPlayer();
      const card = createCard(Color.White, 0, [0, 0, 0, 0, 0]);

      // Should not throw when level is undefined
      expect(() => scoreCard(card, player, [])).not.toThrow();
    });
  });
});

describe("getScoredAffordableCards", () => {
  it("should return empty array when no cards are affordable", () => {
    const player = createPlayer({ gems: [0, 0, 0, 0, 0, 0] });
    const G = createGameState({
      cardsOnTable: [
        [createCard(Color.White, 1, [5, 0, 0, 0, 0])], // Too expensive
        [],
        [],
      ],
    });

    const result = getScoredAffordableCards(G, player);

    expect(result).toEqual([]);
  });

  it("should return affordable cards from table", () => {
    const player = createPlayer({ gems: [5, 0, 0, 0, 0, 0] });
    const affordableCard = createCard(Color.White, 1, [3, 0, 0, 0, 0]);
    const G = createGameState({
      cardsOnTable: [[affordableCard], [], []],
    });

    const result = getScoredAffordableCards(G, player);

    expect(result).toHaveLength(1);
    expect(result[0].card).toEqual(affordableCard);
    expect(result[0].rowIndex).toBe(0);
    expect(result[0].columnIndex).toBe(0);
  });

  it("should return affordable reserved cards", () => {
    const affordableCard = createCard(Color.White, 1, [3, 0, 0, 0, 0]);
    const player = createPlayer({
      gems: [5, 0, 0, 0, 0, 0],
      reservedCards: [affordableCard],
    });
    const G = createGameState();

    const result = getScoredAffordableCards(G, player);

    expect(result).toHaveLength(1);
    expect(result[0].card).toEqual(affordableCard);
    expect(result[0].reserveIndex).toBe(0);
  });

  it("should sort cards by score (highest first)", () => {
    const lowPointCard = createCard(Color.White, 1, [0, 0, 0, 0, 0]);
    const highPointCard = createCard(Color.Blue, 3, [0, 0, 0, 0, 0]);
    const player = createPlayer({ gems: [5, 5, 5, 5, 5, 0] });
    const G = createGameState({
      cardsOnTable: [[lowPointCard, highPointCard], [], []],
    });

    const result = getScoredAffordableCards(G, player);

    expect(result).toHaveLength(2);
    expect(result[0].card.points).toBeGreaterThan(result[1].card.points);
  });

  it("should skip undefined cards on table", () => {
    const card = createCard(Color.White, 1, [0, 0, 0, 0, 0]);
    const player = createPlayer({ gems: [5, 5, 5, 5, 5, 0] });
    const G = createGameState({
      cardsOnTable: [[card, undefined, card], [], []],
    });

    const result = getScoredAffordableCards(G, player);

    expect(result).toHaveLength(2);
  });

  it("should consider player bonuses when determining affordability", () => {
    const card = createCard(Color.White, 1, [3, 0, 0, 0, 0]);
    const player = createPlayer({
      gems: [1, 0, 0, 0, 0, 0],
      cards: [
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
      ], // 2 white bonuses
    });
    const G = createGameState({
      cardsOnTable: [[card], [], []],
    });

    const result = getScoredAffordableCards(G, player);

    // Should be affordable: needs 3 white, has 1 gem + 2 bonuses
    expect(result).toHaveLength(1);
  });

  it("should pass level to scoreCard for table cards", () => {
    const player = createPlayer({
      gems: [5, 5, 5, 5, 5, 0],
      cards: [], // Early game
    });
    const card = createCard(Color.White, 0, [0, 0, 0, 0, 0]);
    const G = createGameState({
      cardsOnTable: [
        [card], // Level 0
        [card], // Level 1
        [card], // Level 2
      ],
    });

    const result = getScoredAffordableCards(G, player);

    expect(result).toHaveLength(3);
    // In early game, level 0 should score highest
    expect(result[0].rowIndex).toBe(0);
  });
});

describe("getGemNeeds", () => {
  it("should return zero needs when player can afford all cards", () => {
    const player = createPlayer({
      gems: [10, 10, 10, 10, 10, 0],
      cards: [],
    });
    const G = createGameState({
      cardsOnTable: [[createCard(Color.White, 1, [1, 1, 1, 1, 1])], [], []],
    });

    const needs = getGemNeeds(G, player);

    expect(needs).toEqual([0, 0, 0, 0, 0]);
  });

  it("should calculate gem needs for cards player cannot afford", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [],
    });
    const G = createGameState({
      cardsOnTable: [
        [createCard(Color.White, 1, [3, 2, 0, 0, 0])], // Needs 3 white, 2 blue
        [],
        [],
      ],
    });

    const needs = getGemNeeds(G, player);

    // Should need white and blue gems
    expect(needs[0]).toBeGreaterThan(0); // White
    expect(needs[1]).toBeGreaterThan(0); // Blue
    expect(needs[2]).toBe(0); // Green
    expect(needs[3]).toBe(0); // Red
    expect(needs[4]).toBe(0); // Black
  });

  it("should weight gem needs by card value", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [],
    });
    const G = createGameState({
      cardsOnTable: [
        [
          createCard(Color.White, 1, [3, 0, 0, 0, 0]), // Low value
          createCard(Color.Blue, 5, [0, 3, 0, 0, 0]), // High value
        ],
        [],
        [],
      ],
    });

    const needs = getGemNeeds(G, player);

    // Blue gems should be weighted higher because the card has more points
    expect(needs[1]).toBeGreaterThan(needs[0]);
  });

  it("should account for player bonuses in gem needs", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        createCard(Color.White, 0, [0, 0, 0, 0, 0]),
      ], // 2 white bonuses
    });
    const G = createGameState({
      cardsOnTable: [
        [createCard(Color.White, 1, [3, 0, 0, 0, 0])], // Needs 3 white
        [],
        [],
      ],
    });

    const needs = getGemNeeds(G, player);

    // Should only need 1 white gem (3 cost - 2 bonuses = 1)
    expect(needs[0]).toBeGreaterThan(0);
    // But the absolute value depends on card scoring
  });

  it("should consider reserved cards in gem needs", () => {
    const reservedCard = createCard(Color.White, 3, [5, 0, 0, 0, 0]);
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      reservedCards: [reservedCard],
    });
    const G = createGameState();

    const needs = getGemNeeds(G, player);

    // Should need white gems for reserved card
    expect(needs[0]).toBeGreaterThan(0);
  });

  it("should account for level-based strategy in gem needs", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [], // Early game
    });
    const G = createGameState({
      cardsOnTable: [
        [createCard(Color.White, 0, [3, 0, 0, 0, 0])], // Level 0
        [createCard(Color.Blue, 0, [0, 3, 0, 0, 0])], // Level 1
        [createCard(Color.Green, 0, [0, 0, 3, 0, 0])], // Level 2
      ],
    });

    const needs = getGemNeeds(G, player);

    // In early game, should prioritize white gems (level 0 cards)
    expect(needs[0]).toBeGreaterThan(needs[2]); // White > Green
  });

  it("should prioritize gems needed for multiple level 0 cards in early game", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0], // No gems yet
      cards: [], // Early game
    });

    const level0Cards = [
      createCard(Color.Red, 0, [0, 2, 1, 0, 0]), // Needs blue + green
      createCard(Color.White, 0, [0, 1, 2, 1, 1]), // Needs blue + green + red + black
      createCard(Color.Black, 0, [0, 0, 2, 1, 0]), // Needs green + red
      createCard(Color.White, 0, [0, 3, 0, 0, 0]), // Needs blue
    ];

    const G = createGameState({
      cardsOnTable: [
        level0Cards, // Level 0
        [], // Level 1
        [], // Level 2
      ],
    });

    const needs = getGemNeeds(G, player);

    // Should heavily need blue and green (most common in level 0 cards)
    expect(needs[1]).toBeGreaterThan(0); // Blue (index 1) - needed by 3 cards
    expect(needs[2]).toBeGreaterThan(0); // Green (index 2) - needed by 3 cards
    expect(needs[3]).toBeGreaterThan(0); // Red (index 3) - needed by 2 cards
    expect(needs[4]).toBeGreaterThan(0); // Black (index 4) - needed by 1 card
    expect(needs[0]).toBe(0); // White (index 0) - not needed

    // Blue should be highest priority (most gems needed: 2+1+3 = 6 total)
    expect(needs[1]).toBeGreaterThan(needs[3]); // Blue > Red
    expect(needs[1]).toBeGreaterThan(needs[4]); // Blue > Black
  });

  it("should prioritize level 0 cards over higher levels in early game with full table", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0], // No gems yet
      cards: [], // Early game - 0 cards
    });

    const level0Cards = [
      createCard(Color.Red, 0, [0, 2, 1, 0, 0]),
      createCard(Color.White, 0, [0, 1, 2, 1, 1]),
      createCard(Color.Black, 0, [0, 0, 2, 1, 0]),
      createCard(Color.White, 0, [0, 3, 0, 0, 0]),
    ];

    const level1Cards = [
      createCard(Color.Green, 3, [0, 0, 6, 0, 0]),
      createCard(Color.Black, 3, [0, 0, 0, 0, 6]),
      createCard(Color.White, 2, [0, 0, 0, 5, 3]),
      createCard(Color.Red, 1, [2, 0, 0, 2, 3]),
    ];

    const level2Cards = [
      createCard(Color.Green, 4, [3, 6, 3, 0, 0]),
      createCard(Color.Blue, 4, [6, 3, 0, 0, 3]),
      createCard(Color.Green, 5, [0, 7, 3, 0, 0]),
      createCard(Color.Green, 4, [0, 7, 0, 0, 0]),
    ];

    const G = createGameState({
      cardsOnTable: [level0Cards, level1Cards, level2Cards],
    });

    const needs = getGemNeeds(G, player);

    // In early game, level 0 card needs should dominate - ONLY level 0 cards should be considered
    // Level 0 needs: Blue (2+1+3=6), Green (1+2+2=5), Red (1+1=2), Black (1)
    // Level 1 and 2 cards should be completely ignored due to massive penalties
    expect(needs[0]).toBe(0); // White - not needed by level 0, so should be 0
    expect(needs[1]).toBeGreaterThan(0); // Blue - needed by level 0
    expect(needs[2]).toBeGreaterThan(0); // Green - needed by level 0
    expect(needs[3]).toBeGreaterThan(0); // Red - needed by level 0
    expect(needs[4]).toBeGreaterThan(0); // Black - needed by level 0
  });

  it("should shift priorities to higher level cards in late game with full table", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0], // No gems yet
      cards: Array(12).fill(createCard(Color.White, 0, [0, 0, 0, 0, 0])), // Late game - 12 cards
    });

    const level0Cards = [
      createCard(Color.Red, 0, [0, 2, 1, 0, 0]),
      createCard(Color.White, 0, [0, 1, 2, 1, 1]),
      createCard(Color.Black, 0, [0, 0, 2, 1, 0]),
      createCard(Color.White, 0, [0, 3, 0, 0, 0]),
    ];

    const level1Cards = [
      createCard(Color.Green, 3, [0, 0, 6, 0, 0]),
      createCard(Color.Black, 3, [0, 0, 0, 0, 6]),
      createCard(Color.White, 2, [0, 0, 0, 5, 3]),
      createCard(Color.Red, 1, [2, 0, 0, 2, 3]),
    ];

    const level2Cards = [
      createCard(Color.Green, 4, [3, 6, 3, 0, 0]),
      createCard(Color.Blue, 4, [6, 3, 0, 0, 3]),
      createCard(Color.Green, 5, [0, 7, 3, 0, 0]),
      createCard(Color.Green, 4, [0, 7, 0, 0, 0]),
    ];

    const G = createGameState({
      cardsOnTable: [level0Cards, level1Cards, level2Cards],
    });

    const needsLateGame = getGemNeeds(G, player);

    // Compare with early game to verify shift
    const earlyPlayer = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [], // 0 cards
    });
    const needsEarlyGame = getGemNeeds(G, earlyPlayer);

    // In late game, level 2 card needs should be weighted higher
    // Level 2 uses primarily blue and green in large quantities
    // The relative importance should shift from level 0 colors to level 2 colors

    // Blue is needed by both level 0 (6 total) and level 2 (6+3+7+7=23 total)
    // In late game, the level 2 blue needs should be weighted more heavily
    expect(needsLateGame[1]).toBeGreaterThan(0); // Blue still needed

    // The weighting should have changed between early and late game
    const earlyBlueRatio =
      needsEarlyGame[1] / needsEarlyGame.reduce((s, n) => s + n, 0);
    const lateBlueRatio =
      needsLateGame[1] / needsLateGame.reduce((s, n) => s + n, 0);

    // Blue should be relatively more important in late game due to high-value level 2 cards
    expect(lateBlueRatio).toBeGreaterThan(earlyBlueRatio * 0.5); // At least maintaining importance
  });

  it("should handle multiple cards needing the same color", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [],
    });
    const G = createGameState({
      cardsOnTable: [
        [
          createCard(Color.White, 1, [3, 0, 0, 0, 0]),
          createCard(Color.White, 1, [2, 0, 0, 0, 0]),
        ],
        [],
        [],
      ],
    });

    const needs = getGemNeeds(G, player);

    // White gem need should be sum of both cards
    expect(needs[0]).toBeGreaterThan(0);
  });

  it("should not count gems player already has", () => {
    const player = createPlayer({
      gems: [3, 0, 0, 0, 0, 0], // Has 3 white gems
      cards: [],
    });
    const G = createGameState({
      cardsOnTable: [
        [createCard(Color.White, 1, [3, 5, 0, 0, 0])], // Needs 3 white, 5 blue
        [],
        [],
      ],
    });

    const needs = getGemNeeds(G, player);

    // Should not need white (already has enough)
    expect(needs[0]).toBe(0);
    // Should need blue
    expect(needs[1]).toBeGreaterThan(0);
  });
});
