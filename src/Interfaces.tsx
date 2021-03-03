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

export interface SplendorCtx extends Ctx {
  winner?: number;
}
