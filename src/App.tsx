import "./App.css";
import { Client } from "boardgame.io/react";
import { SplendorBoard } from "./components/SplendorBoard";
import { Card, Noble, Player, SplendorCtx } from "./Interfaces";
import { level1Cards, level2Cards, level3Cards, nobles } from "./constants";
import {
  build,
  buildFromReserve,
  discardGems,
  pick,
  pickNoble,
  reserve,
} from "./Moves";
import { Ctx } from "boardgame.io";

export interface GameState {
  cardsOnTable: Array<Array<Card | undefined>>;
  cardsInDeck: Card[][];
  gems: number[];
  nobles: Noble[];
  players: Player[];
}

const populateLevel1Cards = (): Card[] => {
  return Object.assign([], level1Cards);
};

const populateLevel2Cards = (): Card[] => {
  return Object.assign([], level2Cards);
};

const populateLevel3Cards = (): Card[] => {
  return Object.assign([], level3Cards);
};

// Setup functions
const setupGems = (numPlayers: number): number[] => {
  switch (numPlayers) {
    case 2:
      return [4, 4, 4, 4, 4, 5];
    case 3:
      return [5, 5, 5, 5, 5, 5];
    default:
      return [7, 7, 7, 7, 7, 5];
  }
};

const setupPlayers = (numPlayers: number): Player[] => {
  return Array(numPlayers).fill({
    cards: [],
    reservedCards: [],
    gems: [0, 0, 0, 0, 0, 0],
    nobles: [],
  });
};

export const SplendorGame = {
  setup: (ctx: SplendorCtx): GameState => {
    // Setup gems, cards and nobles
    const level1Cards: Card[] =
      ctx.random?.Shuffle(populateLevel1Cards()) || [];
    const a = level1Cards.splice(0, 4);

    const level2Cards: Card[] =
      ctx.random?.Shuffle(populateLevel2Cards()) || [];
    const b = level2Cards.splice(0, 4);

    const level3Cards = ctx.random?.Shuffle(populateLevel3Cards()) || [];
    const c = level3Cards.splice(0, 4);

    const cardsOnTable = [a, b, c];

    return {
      cardsOnTable: cardsOnTable,
      cardsInDeck: [level1Cards, level2Cards, level3Cards],
      gems: setupGems(ctx.numPlayers),
      players: setupPlayers(ctx.numPlayers),
      nobles: ctx.random?.Shuffle(nobles).splice(0, ctx.numPlayers + 1) || [],
    };
  },

  turn: {
    moveLimit: 2,

    stages: {
      Main: {
        moves: {
          pick,
          build,
          reserve,
          buildFromReserve,
        },
      },
      DiscardGems: { next: "Main", moves: { discardGems } },
      PickNoble: { next: "Main", moves: { pickNoble } },
    },
  },
  ai: {
    enumerate: (G: GameState, ctx: Ctx) => {
      const moves: any[] = [];
      // pick
      moves.push(
        {
          move: "pick",
          args: [[1, 1, 1, 0, 0]],
        },
        {
          move: "pick",
          args: [[1, 0, 1, 1, 0]],
        }
      );

      // build
      return moves;
    },
  },

  moves: {
    pick,
    build,
    reserve,
    buildFromReserve,
    pickNoble,
    discardGems,
  },

  endIf: (G: GameState, ctx: SplendorCtx) => {
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
  },
};

const App = Client({
  game: SplendorGame,
  // @ts-ignore
  board: SplendorBoard,
  numPlayers: 3,
  debug: false,
});

export default App;
