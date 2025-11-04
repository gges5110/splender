import { describe, it, expect } from "vitest";
import { generateGemMoves } from "./gemPicking";
import { getGemNeeds } from "./scoring";
import { Card, Color, GameState, Player } from "src/shared/types";

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

describe("generateGemMoves", () => {
  it("should NOT pick white gems in early game when only level 0 cards need other colors", () => {
    const player = createPlayer({
      gems: [0, 0, 0, 0, 0, 0],
      cards: [], // Early game
    });

    const level0Cards = [
      createCard(Color.Red, 0, [0, 2, 1, 0, 0]), // Needs blue + green
      createCard(Color.White, 0, [0, 1, 2, 1, 1]), // Needs blue + green + red + black
      createCard(Color.Black, 0, [0, 0, 2, 1, 0]), // Needs green + red
      createCard(Color.White, 0, [0, 3, 0, 0, 0]), // Needs blue
    ];

    const level1Cards = [
      createCard(Color.Green, 3, [0, 0, 6, 0, 0]),
      createCard(Color.Black, 3, [0, 0, 0, 0, 6]),
      createCard(Color.White, 2, [0, 0, 0, 5, 3]),
      createCard(Color.Red, 1, [2, 0, 0, 2, 3]), // This needs WHITE!
    ];

    const level2Cards = [
      createCard(Color.Green, 4, [3, 6, 3, 0, 0]), // This needs WHITE!
      createCard(Color.Blue, 4, [6, 3, 0, 0, 3]), // This needs WHITE!
      createCard(Color.Green, 5, [0, 7, 3, 0, 0]),
      createCard(Color.Green, 4, [0, 7, 0, 0, 0]),
    ];

    const G = createGameState({
      cardsOnTable: [level0Cards, level1Cards, level2Cards],
      gems: [4, 4, 4, 4, 4, 5],
    });

    // First check gem needs
    const needs = getGemNeeds(G, player);

    // Debug: Log gem needs
    const colors = ["White", "Blue", "Green", "Red", "Black"];
    needs.forEach((need, i) => {
      console.log(`${colors[i]}: ${need}`);
    });

    // Verify gem needs are as expected (white should be 0)
    expect(needs[0]).toBe(0); // White
    expect(needs[1]).toBeGreaterThan(0); // Blue
    expect(needs[2]).toBeGreaterThan(0); // Green

    const gemMoves = generateGemMoves(G, player);

    // Debug top 5
    console.log("\nTop 5 gem moves:");
    gemMoves.slice(0, 5).forEach((move, i) => {
      const picked = move.args
        .map((c, idx) => (c > 0 ? `${c}${colors[idx][0]}` : ""))
        .filter((x) => x)
        .join(" ");
      console.log(`${i + 1}. ${picked} - Score: ${move.score}`);
    });

    // The top move should NOT include white gems (since white has 0 need)
    const topMove = gemMoves[0];
    expect(topMove.args[0]).toBe(0); // White index should be 0

    // Top 2 moves should avoid white (they should be the best combinations)
    expect(gemMoves[0].args[0]).toBe(0);
    expect(gemMoves[1].args[0]).toBe(0);

    // All moves with white should score lower than the best move without white
    const movesWithWhite = gemMoves.filter((m) => m.args[0] > 0);
    const movesWithoutWhite = gemMoves.filter((m) => m.args[0] === 0);

    if (movesWithWhite.length > 0 && movesWithoutWhite.length > 0) {
      const bestWithWhite = movesWithWhite[0].score;
      const bestWithoutWhite = movesWithoutWhite[0].score;
      expect(bestWithoutWhite).toBeGreaterThan(bestWithWhite);
    }
  });
});
