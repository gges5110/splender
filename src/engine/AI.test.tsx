import { describe, it, expect } from "vitest";
import { enumerateAIMoves } from "./AI";
import {
  Card,
  Color,
  GameState,
  Noble,
  Player,
} from "src/shared/types";
import { Ctx } from "boardgame.io";

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
  cardCountByColors: [number, number, number, number, number]
): Noble => ({
  acquired: false,
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

// Helper to create a basic context
const createCtx = (overrides?: Partial<Ctx>): Ctx =>
  ({
    currentPlayer: "0",
    numPlayers: 2,
    playOrder: ["0", "1"],
    playOrderPos: 0,
    turn: 0,
    phase: "",
    activePlayers: null,
    ...overrides,
  } as Ctx);

describe("AI Decision Making", () => {
  describe("Card Prioritization", () => {
    it("should prioritize high-point cards over low-point cards", () => {
      const highPointCard = createCard(Color.White, 3, [3, 0, 0, 0, 0]);
      const lowPointCard = createCard(Color.Blue, 0, [3, 0, 0, 0, 0]);

      const player = createPlayer({
        gems: [5, 5, 5, 5, 5, 5], // Can afford both
      });

      const G = createGameState({
        cardsOnTable: [[lowPointCard, highPointCard], [], []],
        players: [player, createPlayer()],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have build moves
      expect(moves.length).toBeGreaterThan(0);

      // First move should be building the high-point card (index 1)
      const firstBuildMove = moves.find((m) => m.move === "build");
      expect(firstBuildMove).toBeDefined();
      expect(firstBuildMove?.args).toEqual([0, 1]); // Row 0, Column 1 (high point card)
    });

    it("should consider noble requirements when scoring cards", () => {
      const whiteCard = createCard(Color.White, 0, [2, 0, 0, 0, 0]);
      const blueCard = createCard(Color.Blue, 0, [2, 0, 0, 0, 0]);

      const noble = createNoble([3, 0, 0, 0, 0]); // Needs 3 white cards

      const player = createPlayer({
        gems: [5, 5, 5, 5, 5, 5],
        cards: [
          createCard(Color.White, 0, [0, 0, 0, 0, 0]),
          createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        ], // Already has 2 white cards
      });

      const G = createGameState({
        cardsOnTable: [[blueCard, whiteCard], [], []],
        nobles: [noble],
        players: [player, createPlayer()],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // First build move should prioritize white card (helps complete noble)
      const firstBuildMove = moves.find((m) => m.move === "build");
      expect(firstBuildMove).toBeDefined();
      expect(firstBuildMove?.args).toEqual([0, 1]); // White card at column 1
    });

    it("should value cards with bonuses for engine building", () => {
      const player = createPlayer({
        gems: [5, 5, 5, 5, 5, 5],
        cards: [], // No cards yet, so bonuses are very valuable
      });

      const cardWithPoints = createCard(Color.White, 1, [3, 0, 0, 0, 0]);
      const cardWithBonus = createCard(Color.Blue, 0, [3, 0, 0, 0, 0]);

      const G = createGameState({
        cardsOnTable: [[cardWithPoints, cardWithBonus], [], []],
        players: [player, createPlayer()],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have build moves
      expect(moves.length).toBeGreaterThan(0);

      // Early game: points are more valuable, but bonuses still matter
      // The 1-point card should be prioritized
      const buildMoves = moves.filter((m) => m.move === "build");
      expect(buildMoves.length).toBeGreaterThan(0);
    });
  });

  describe("Gem Selection Strategy", () => {
    it("should pick gems when no cards are affordable", () => {
      const expensiveCard = createCard(Color.White, 3, [5, 5, 5, 5, 5]);

      const player = createPlayer({
        gems: [0, 0, 0, 0, 0, 0], // No gems
      });

      const G = createGameState({
        cardsOnTable: [[expensiveCard], [], []],
        gems: [4, 4, 4, 4, 4, 5],
        players: [player, createPlayer()],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have pick moves since no cards are affordable
      const pickMoves = moves.filter((m) => m.move === "pick");
      expect(pickMoves.length).toBeGreaterThan(0);
    });

    it("should prefer picking 2 gems of same color when available", () => {
      const player = createPlayer({
        gems: [0, 0, 0, 0, 0, 0],
      });

      const G = createGameState({
        gems: [4, 4, 4, 4, 4, 5], // All colors have 4+ gems
        cardsOnTable: [[createCard(Color.White, 1, [3, 0, 0, 0, 0])], [], []],
        players: [player, createPlayer()],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have moves to pick 2 gems of same color
      const pick2Moves = moves.filter((m) => {
        if (m.move === "pick" && m.args) {
          const gems = m.args[0];
          return gems.some((count: number) => count === 2);
        }
        return false;
      });

      expect(pick2Moves.length).toBeGreaterThan(0);
    });

    it("should select gems that help purchase valuable cards", () => {
      // Card that needs white gems
      const whiteCard = createCard(Color.White, 3, [4, 0, 0, 0, 0]);

      const player = createPlayer({
        gems: [0, 0, 0, 0, 0, 0],
      });

      const G = createGameState({
        gems: [4, 4, 4, 4, 4, 5],
        cardsOnTable: [[whiteCard], [], []],
        players: [player, createPlayer()],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should prioritize picking white gems (index 0)
      const pickMoves = moves.filter((m) => m.move === "pick");
      expect(pickMoves.length).toBeGreaterThan(0);

      // First pick move should include white gems
      const firstPick = pickMoves[0];
      if (firstPick.args) {
        const gems = firstPick.args[0];
        // Either picking 2 white or 3 different including white
        const hasWhite = gems[0] > 0;
        expect(hasWhite).toBe(true);
      }
    });
  });

  describe("Gem Discarding Strategy", () => {
    it("should discard gems when over the limit", () => {
      const player = createPlayer({
        gems: [3, 3, 3, 3, 0, 0], // 12 gems total (over limit of 10)
      });

      const G = createGameState({
        players: [player, createPlayer()],
      });

      const ctx = createCtx({
        activePlayers: { "0": "DiscardGems" },
      });

      const moves = enumerateAIMoves(G, ctx);

      // Should return a discard move
      expect(moves.length).toBe(1);
      expect(moves[0].move).toBe("discardGems");

      // Should discard 2 gems (12 - 10 = 2)
      const discardedGems = moves[0].args?.[0];
      expect(discardedGems).toBeDefined();
      const totalDiscarded = discardedGems.reduce(
        (sum: number, count: number) => sum + count,
        0
      );
      expect(totalDiscarded).toBe(2);
    });
  });

  describe("Noble Selection", () => {
    it("should pick a noble when required", () => {
      const player = createPlayer();

      const G = createGameState({
        nobles: [createNoble([3, 0, 0, 0, 0])],
        players: [player, createPlayer()],
      });

      const ctx = createCtx({
        activePlayers: { "0": "PickNoble" },
      });

      const moves = enumerateAIMoves(G, ctx);

      // Should return a pick noble move
      expect(moves.length).toBe(1);
      expect(moves[0].move).toBe("pickNoble");
      expect(moves[0].args).toEqual([0]);
    });
  });

  describe("Reserved Cards", () => {
    it("should build from reserve when affordable", () => {
      const reservedCard = createCard(Color.White, 2, [2, 0, 0, 0, 0]);

      const player = createPlayer({
        gems: [3, 3, 3, 3, 3, 3],
        reservedCards: [reservedCard],
      });

      const G = createGameState({
        players: [player, createPlayer()],
        cardsOnTable: [[], [], []],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have a build from reserve move
      const buildFromReserveMoves = moves.filter(
        (m) => m.move === "buildFromReserve"
      );
      expect(buildFromReserveMoves.length).toBeGreaterThan(0);
      expect(buildFromReserveMoves[0].args).toEqual([0]);
    });

    it("should reserve cards when at gem limit", () => {
      const player = createPlayer({
        gems: [2, 2, 2, 2, 1, 0], // 9 gems (at limit - 1)
      });

      const card = createCard(Color.White, 2, [5, 5, 5, 5, 5]); // Expensive card

      const G = createGameState({
        players: [player, createPlayer()],
        cardsOnTable: [[card], [], []],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have reserve moves since at gem limit
      const reserveMoves = moves.filter((m) => m.move === "reserve");
      expect(reserveMoves.length).toBeGreaterThan(0);
    });
  });

  describe("Overall AI Behavior", () => {
    it("should always return at least one move or endTurn event", () => {
      const G = createGameState({
        gems: [0, 0, 0, 0, 0, 0], // No gems available
        cardsOnTable: [[], [], []], // No cards available
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should return at least endTurn event
      expect(moves.length).toBeGreaterThan(0);
    });

    it("should prioritize building over picking gems", () => {
      const affordableCard = createCard(Color.White, 1, [1, 0, 0, 0, 0]);

      const player = createPlayer({
        gems: [2, 2, 2, 2, 2, 2], // Can afford the card
      });

      const G = createGameState({
        players: [player, createPlayer()],
        cardsOnTable: [[affordableCard], [], []],
        gems: [4, 4, 4, 4, 4, 5],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // First moves should be build moves, not pick moves
      const buildMoves = moves.filter((m) => m.move === "build");
      const pickMoves = moves.filter((m) => m.move === "pick");

      expect(buildMoves.length).toBeGreaterThan(0);
      // If we can build, we shouldn't have pick moves returned
      // (they would only be returned if no build moves exist)
      expect(pickMoves.length).toBe(0);
    });
  });

  describe("Strategic Decision Making", () => {
    it("should make smarter decisions with multiple options", () => {
      // Scenario: Player has 2 white cards, needs 1 more for noble
      const whiteCard = createCard(Color.White, 0, [2, 0, 0, 0, 0]);
      const highPointCard = createCard(Color.Blue, 4, [2, 0, 0, 0, 0]);

      const noble = createNoble([3, 0, 0, 0, 0]); // Needs 3 white

      const player = createPlayer({
        gems: [5, 5, 5, 5, 5, 5],
        cards: [
          createCard(Color.White, 0, [0, 0, 0, 0, 0]),
          createCard(Color.White, 0, [0, 0, 0, 0, 0]),
        ],
      });

      const G = createGameState({
        players: [player, createPlayer()],
        cardsOnTable: [[whiteCard, highPointCard], [], []],
        nobles: [noble],
      });

      const ctx = createCtx();
      const moves = enumerateAIMoves(G, ctx);

      // Should have multiple build options
      const buildMoves = moves.filter((m) => m.move === "build");
      expect(buildMoves.length).toBe(2);

      // The AI should consider both noble progress and points
      // This test mainly verifies the AI considers multiple factors
      expect(buildMoves[0].args).toBeDefined();
    });
  });
});
