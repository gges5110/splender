import {
  build,
  buildFromReserve,
  discardGems,
  pick,
  pickNoble,
  reserve,
} from "./Moves";
import { enumerateAIMoves } from "./AI";
import { Card, GameState, Player } from "./Interfaces";
import { level1Cards, level2Cards, level3Cards, nobles } from "./constants";
import type { Game } from "boardgame.io";

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

export const getDefaultPlayer = (): Player => {
  return {
    cards: [],
    reservedCards: [],
    gems: [0, 0, 0, 0, 0, 0],
    nobles: [],
  };
};

const setupPlayers = (numPlayers: number): Player[] => {
  return Array(numPlayers).fill(getDefaultPlayer());
};

export const SplendorGame: Game<GameState> = {
  setup: (ctx) => {
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
  events: {
    endGame: false,
    endPhase: false,
    endTurn: false,
    setPhase: false,
    endStage: false,
    setStage: true,
    pass: true,
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
    enumerate: enumerateAIMoves,
  },

  moves: {
    pick,
    build,
    reserve,
    buildFromReserve,
    pickNoble,
    discardGems,
  },

  endIf: (G, ctx) => {
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
