import { pick } from "./Moves";
import { GameState, SplendorGame } from "./App";

describe("Moves.pick", () => {
  test("should be able to pick gems", () => {
    const ctx = {
      currentPlayer: "0",
      numPlayers: 3,
      activePlayers: null,
      phase: "",
      playOrder: ["0", "1", "2"],
      playOrderPos: 0,
      turn: 0,
    };

    const G: GameState = SplendorGame.setup(ctx);

    pick(G, ctx, [1, 1, 1, 0, 0]);

    expect(G.gems).toEqual([4, 4, 4, 5, 5, 7]);
  });
});
