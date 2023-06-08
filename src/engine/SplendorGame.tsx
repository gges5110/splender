import {
  build,
  buildFromReserve,
  discardGems,
  pick,
  pickNoble,
  reserve,
} from "./Moves";
import { enumerateAIMoves } from "./AI";
import { GameState } from "../interfaces/Interfaces";
import type { Ctx, Game } from "boardgame.io";
import { setup } from "./GameSetup";
import { GAME_NAME } from "../config";

const endIf = (G: GameState, ctx: Ctx) => {
  if (Number(ctx.currentPlayer) !== ctx.numPlayers - 1) {
    return;
  }

  let highestScorePlayerIndex = 0,
    highestScore = 0;
  const scores: number[] = G.players.map((player, index) => {
    const score =
      (player.cards.length > 0 &&
        player.cards.map((card) => card.points).reduce((p, c) => p + c, 0) +
          player.nobles
            .map((noble) => noble.points)
            .reduce((p, c) => p + c, 0)) ||
      0;

    if (score > highestScore) {
      highestScorePlayerIndex = index;
      highestScore = score;
    }

    return score;
  });

  if (scores.some((point) => point >= 15)) {
    return { winner: highestScorePlayerIndex };
  }
};

export const SplendorGame: Game<GameState> = {
  name: GAME_NAME,
  setup,
  endIf,
  turn: {
    maxMoves: 2,
    stages: {
      Main: {
        moves: {
          pick,
          build: { move: build, client: false },
          reserve: { move: reserve, client: false },
          buildFromReserve,
        },
      },
      DiscardGems: { next: "Main", moves: { discardGems } },
      PickNoble: { next: "Main", moves: { pickNoble } },
    },
  },
  ai: {
    enumerate: enumerateAIMoves,
  },
  playerView: (G) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cardsInDeck, ...strippedGameState } = G;
    return strippedGameState;
  },
  moves: {
    pick,
    build: { move: build, client: false },
    reserve: { move: reserve, client: false },
    buildFromReserve,
    pickNoble,
    discardGems,
  },
  events: {
    endGame: false,
    endPhase: false,
    endTurn: false,
    setPhase: false,
    endStage: false,
    setStage: true,
    pass: true,
  },
};
