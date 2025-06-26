export enum Color {
  White,
  Blue,
  Green,
  Red,
  Black,
  Gold,
}

export type GemsType = [number, number, number, number, number];
export type GemsTypeWithGold = [number, number, number, number, number, number];

export interface Card {
  color: Color;
  cost: GemsType;
  points: number;
}

export interface Noble {
  acquired: boolean;
  cardCountByColors: GemsType;
}

export interface Player {
  cards: Card[];
  gems: GemsTypeWithGold;
  nobles: Noble[];
  reservedCards: Card[];
}

export interface GameState {
  cardsInDeck: Card[][];
  // intentionally allow undefined element to remember the card position on the table
  // Index: [level][column], level 0 is the lowest/cheapest and level 2 is the highest.
  cardsOnTable: Array<Array<Card | undefined>>; // secret
  gems: GemsTypeWithGold;
  nobles: Noble[];
  numCardsInDeck: Array<number>;
  players: Player[];
}

export interface User {
  displayName: string;
  uid: string;
}

export interface DialogProps {
  onClose(): void;
  open: boolean;
}
