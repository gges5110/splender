import { Ctx } from "boardgame.io";

export enum Color {
  White,
  Blue,
  Green,
  Red,
  Black,
  Gold,
}

export interface Card {
  cost: number[];
  color: Color;
  points: number;
}

export interface Noble {
  cardCountByColors: number[];
  points: number;
}

export interface Player {
  cards: Card[];
  reservedCards: Card[];
  gems: number[];
  nobles: Noble[];
}

export interface Moves {
  pick: any;
  build: any;
  reserve: any;
  buildFromReserve: any;
  pickNoble: any;
  discardGems: any;
}

export interface GameState {
  // intentionally allow undefined element to remember the card position on the table
  // Index: [level][column], level 0 is the lowest/cheapest and level 2 is the highest.
  cardsOnTable: Array<Array<Card | undefined>>;
  cardsInDeck: Card[][];
  gems: number[];
  nobles: Noble[];
  players: Player[];
}

export interface SplendorCtx extends Ctx {
  winner?: number;
}
