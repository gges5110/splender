export enum Color {
  White,
  Blue,
  Green,
  Red,
  Black,
  Gold,
}

export interface Card {
  color: Color;
  cost: number[];
  points: number;
}

export interface Noble {
  acquired: boolean;
  cardCountByColors: number[];
  points: number;
}

export interface Player {
  cards: Card[];
  gems: number[];
  nobles: Noble[];
  reservedCards: Card[];
}

export interface GameState {
  cardsInDeck: Card[][];
  // intentionally allow undefined element to remember the card position on the table
  // Index: [level][column], level 0 is the lowest/cheapest and level 2 is the highest.
  cardsOnTable: Array<Array<Card | undefined>>;
  gems: number[];
  nobles: Noble[];
  players: Player[];
}
