import {
  build,
  buildFromReserve,
  discardGems,
  pick,
  pickNoble,
  reserve,
} from "./Moves";
import { SplendorGame } from "./SplendorGame";
import { INVALID_MOVE } from "boardgame.io/core";
import { Ctx } from "boardgame.io";
import { Card, Color, GameState, Noble } from "src/interfaces/Interfaces";
import { vi } from "vitest";

const getDefaultCtx = (): Ctx => {
  const ctx = {
    random: {
      D4: vi.fn(),
      D6: vi.fn(),
      D10: vi.fn(),
      D12: vi.fn(),
      D20: vi.fn(),
      Die: vi.fn(),
      Number: vi.fn(),
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
  return ctx;
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
  return {
    cost: [0, 0, 0, 2, 1],
    color: Color.White,
    points: 0,
  };
};

const getDefaultNoble = (): Noble => {
  return {
    cardCountByColors: [3, 3, 3, 0, 0],
    acquired: false,
  };
};

let ctx: Ctx, G: GameState;

describe("Moves", () => {
  beforeEach(() => {
    ctx = getDefaultCtx();
    G = getDefaultGameState();
  });

  describe("pick", () => {
    test("should be able to pick gems", () => {
      pick(G, ctx, [1, 1, 1, 0, 0]);

      expect(G.gems).toEqual([4, 4, 4, 5, 5, 5]);
    });

    test("picking more than the amount available", () => {
      G = { ...G, gems: [0, 1, 1, 0, 0, 0] };

      expect(pick(G, ctx, [1, 1, 1, 0, 0])).toEqual(INVALID_MOVE);
    });
  });

  describe("build", () => {
    test("should be able to build", () => {
      expect(G.cardsOnTable[0][0]).toBeDefined();
      G = {
        ...G,
        players: Object.assign(G.players, {
          0: {
            cards: [],
            reservedCards: [],
            gems: Object.assign([], G.cardsOnTable[0][0]?.cost),
            nobles: [],
          },
        }),
      };

      build(G, ctx, 0, 0);

      expect(G.players[0].cards).toHaveLength(1);
    });

    test("should not be able to build without enough gems", () => {
      expect(G.cardsOnTable[0][0]).toBeDefined();
      expect(G.cardsOnTable[0][0]?.cost.some((c) => c > 0)).toBe(true);

      expect(build(G, ctx, 0, 0)).toEqual(INVALID_MOVE);
    });
  });

  describe("reserve", () => {
    test("should be able to reserve by default", () => {
      const expectedReservedCard = G.cardsOnTable[0][0];

      expect(reserve(G, ctx, 0, 0)).not.toEqual(INVALID_MOVE);
      expect(G.players[0].reservedCards).toHaveLength(1);
      expect(G.players[0].reservedCards[0]).toEqual(expectedReservedCard);
      expect(G.players[0].gems[5]).toEqual(1);
      // Should deal a new card on table
      expect(G.cardsOnTable[0][0]).not.toEqual(expectedReservedCard);
    });

    test("should not be able to reserve more than 3 cards", () => {
      G = {
        ...G,
        players: Object.assign(G.players, {
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

  describe("buildFromReserve", function () {
    test("should be able to build from reserve", () => {
      G = {
        ...G,
        players: Object.assign(G.players, {
          0: {
            cards: [],
            reservedCards: Array(1).fill(getDefaultCard()),
            gems: [0, 0, 0, 2, 1],
            nobles: [],
          },
        }),
      };

      expect(buildFromReserve(G, ctx, 0)).not.toEqual(INVALID_MOVE);
      expect(G.players[0].cards).toHaveLength(1);
      expect(G.players[0].cards[0]).toEqual(getDefaultCard());
    });

    test("should not be able to build from reserve with insufficient gems", () => {
      G = {
        ...G,
        players: Object.assign(G.players, {
          0: {
            cards: [],
            reservedCards: Array(1).fill(getDefaultCard()),
            gems: [0, 0, 0, 0, 0],
            nobles: [],
          },
        }),
      };

      expect(buildFromReserve(G, ctx, 0)).toEqual(INVALID_MOVE);
      expect(G.players[0].cards).toHaveLength(0);
    });
  });

  describe("pickNoble", function () {
    test("should check if player is eligible", () => {
      G = { ...G, nobles: [getDefaultNoble()] };
      expect(pickNoble(G, ctx, 0)).toEqual(INVALID_MOVE);
    });

    test("should be able to pick noble with sufficient cards", () => {
      G = {
        ...G,
        nobles: [getDefaultNoble()],
        players: Object.assign(G.players, {
          0: {
            cards: [
              {
                color: Color.White,
              },
              {
                color: Color.White,
              },
              {
                color: Color.White,
              },
              {
                color: Color.Blue,
              },
              {
                color: Color.Blue,
              },
              {
                color: Color.Blue,
              },
              {
                color: Color.Green,
              },
              {
                color: Color.Green,
              },
              {
                color: Color.Green,
              },
            ],
            reservedCards: [],
            gems: [0, 0, 0, 0, 0],
            nobles: [],
          },
        }),
      };
      expect(pickNoble(G, ctx, 0)).not.toEqual(INVALID_MOVE);
      expect(G.players[0].nobles).toHaveLength(1);
      expect(G.nobles[0].acquired).toEqual(true);
    });
  });

  describe("discardGems", function () {
    test("should check if discard gems is needed", () => {
      expect(discardGems(G, ctx, [0, 1, 1, 0, 0])).toEqual(INVALID_MOVE);
    });

    test("should check if gems are sufficient to discard", () => {
      G = {
        ...G,
        players: Object.assign(G.players, {
          0: {
            cards: [],
            reservedCards: [],
            gems: [4, 0, 0, 4, 4],
            nobles: [],
          },
        }),
      };

      expect(discardGems(G, ctx, [0, 1, 1, 0, 0])).toEqual(INVALID_MOVE);
    });

    test("should check if discards down to limit", () => {
      G = {
        ...G,
        players: Object.assign(G.players, {
          0: {
            cards: [],
            reservedCards: [],
            gems: [4, 0, 0, 4, 4],
            nobles: [],
          },
        }),
      };

      expect(discardGems(G, ctx, [0, 0, 0, 1, 0])).toEqual(INVALID_MOVE);
    });

    test("should be able to discard gems", () => {
      G = {
        ...G,
        gems: [0, 0, 0, 0, 0, 0],
        players: Object.assign(G.players, {
          0: {
            cards: [],
            reservedCards: [],
            gems: [4, 0, 0, 4, 4],
            nobles: [],
          },
        }),
      };

      expect(discardGems(G, ctx, [0, 0, 0, 1, 1])).not.toEqual(INVALID_MOVE);
      expect(G.players[0].gems).toEqual([4, 0, 0, 3, 3]);
      expect(G.gems).toEqual([0, 0, 0, 1, 1, 0]);
    });
  });
});
