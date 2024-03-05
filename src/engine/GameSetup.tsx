import { Card, GemsTypeWithGold, Player } from "src/interfaces/Interfaces";
import { level1Cards, level2Cards, level3Cards, nobles } from "src/constants";
import { Ctx } from "boardgame.io";

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
const setupGems = (numPlayers: number): GemsTypeWithGold => {
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
export const deriveNumCardsInDeck = (
  cardsInDeck: Array<Array<Card>>
): Array<number> => {
  return cardsInDeck.map((cardsInDeck) => cardsInDeck.length);
};
export const setup = (ctx: Ctx) => {
  // Setup gems, cards and nobles
  const level1Cards: Card[] = ctx.random?.Shuffle(populateLevel1Cards()) || [];
  const a = level1Cards.splice(0, 4);

  const level2Cards: Card[] = ctx.random?.Shuffle(populateLevel2Cards()) || [];
  const b = level2Cards.splice(0, 4);

  const level3Cards = ctx.random?.Shuffle(populateLevel3Cards()) || [];
  const c = level3Cards.splice(0, 4);

  const cardsOnTable = [a, b, c];
  const cardsInDeck = [level1Cards, level2Cards, level3Cards];
  return {
    cardsOnTable: cardsOnTable,
    cardsInDeck: cardsInDeck,
    numCardsInDeck: deriveNumCardsInDeck(cardsInDeck),
    gems: setupGems(ctx.numPlayers),
    players: setupPlayers(ctx.numPlayers),
    nobles: ctx.random?.Shuffle(nobles).splice(0, ctx.numPlayers + 1) || [],
  };
};
