import { build, pick, reserve } from "./Moves";
import { SplendorGame } from "./SplendorGame";
import { INVALID_MOVE } from "boardgame.io/core";
import { Ctx } from "boardgame.io";
import { Card, Color, GameState } from "../Interfaces";

const getDefaultCtx = (): Ctx => {
  return {
    random: {
      D4: jest.fn(),
      D6: jest.fn(),
      D10: jest.fn(),
      D12: jest.fn(),
      D20: jest.fn(),
      Die: jest.fn(),
      Number: jest.fn(),
      Shuffle: (t: any) => t,
    },
    currentPlayer: "0",
    numPlayers: 3,
    activePlayers: null,
    phase: "",
    playOrder: ["0", "1", "2"],
    playOrderPos: 0,
    turn: 0,
  };
};

const getDefaultGameState = (): GameState => {
  const game = SplendorGame;
  if (game.setup) {
    return Object.assign({}, game.setup(getDefaultCtx()));
  } else {
    throw Error("Game setup is undefined");
  }
};

const getDefaultCard = (): Card => {
  return { cost: [0, 0, 0, 0, 0], color: Color.Blue, points: 0 };
};

describe("Moves", () => {
  describe("pick", () => {
    test("should be able to pick gems", () => {
      const ctx = getDefaultCtx();
      const G = getDefaultGameState();

      pick(G, ctx, [1, 1, 1, 0, 0]);

      expect(G.gems).toEqual([4, 4, 4, 5, 5, 5]);
    });

    test("picking more than the amount available", () => {
      const ctx = getDefaultCtx();
      const G = { ...getDefaultGameState(), gems: [0, 1, 1, 0, 0] };

      expect(pick(G, ctx, [1, 1, 1, 0, 0])).toEqual(INVALID_MOVE);
    });
  });

  describe("build", () => {
    test("should be able to build", () => {
      const ctx = getDefaultCtx();
      const defaultGameState = getDefaultGameState();

      expect(defaultGameState.cardsOnTable[0][0]).toBeDefined();
      const G: GameState = {
        ...defaultGameState,
        players: Object.assign(defaultGameState.players, {
          0: {
            cards: [],
            reservedCards: [],
            gems: Object.assign([], defaultGameState.cardsOnTable[0][0]?.cost),
            nobles: [],
          },
        }),
      };

      build(G, ctx, 0, 0);

      expect(G.players[0].cards).toHaveLength(1);
    });

    test("should not be able to build without enough gems", () => {
      const ctx = getDefaultCtx();
      const G: GameState = getDefaultGameState();
      expect(G.cardsOnTable[0][0]).toBeDefined();
      expect(G.cardsOnTable[0][0]?.cost.some((c) => c > 0)).toBe(true);

      expect(build(G, ctx, 0, 0)).toEqual(INVALID_MOVE);
    });
  });

  describe("reserve", () => {
    test("should be able to reserve by default", () => {
      const ctx = getDefaultCtx();
      const G: GameState = getDefaultGameState();
      const expectedReservedCard = G.cardsOnTable[0][0];

      expect(reserve(G, ctx, 0, 0)).not.toEqual(INVALID_MOVE);
      expect(G.players[0].reservedCards).toHaveLength(1);
      expect(G.players[0].reservedCards[0]).toEqual(expectedReservedCard);
      expect(G.players[0].gems[5]).toEqual(1);
      // Should deal a new card on table
      expect(G.cardsOnTable[0][0]).not.toEqual(expectedReservedCard);
    });

    test("should not be able to reserve more than 3 cards", () => {
      const ctx = getDefaultCtx();
      const defaultGameState = getDefaultGameState();

      const G: GameState = {
        ...defaultGameState,
        players: Object.assign(defaultGameState.players, {
          0: {
            cards: [],
            reservedCards: Array(3).fill(getDefaultCard()),
            gems: [0, 0, 0, 0, 0],
            nobles: [],
          },
        }),
      };

      expect(reserve(G, ctx, 0, 0)).toEqual(INVALID_MOVE);
    });
  });
});
