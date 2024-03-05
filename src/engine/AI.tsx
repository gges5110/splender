import { AiEnumerate, Ctx } from "boardgame.io";
import { GameState, Player } from "src/interfaces/Interfaces";
import { gemsInHandLimit } from "./Moves";
import {
  getTotalCount,
  playerCanAffordCard,
  playerIsEligibleToPickSomeNobles,
} from "./MovesUtil";

export const enumerateAIMoves = (G: GameState, ctx: Ctx): AiEnumerate => {
  const moves: AiEnumerate = [];
  const currentPlayer = G.players[Number(ctx.currentPlayer)];

  // discard
  if (
    ctx.activePlayers != null &&
    ctx.activePlayers[Number(ctx.currentPlayer)] === "DiscardGems"
  ) {
    let diff = getTotalCount(currentPlayer.gems) - gemsInHandLimit;
    const discardingGems = currentPlayer.gems.map((gem) => {
      if (gem > 0 && diff > 0) {
        diff--;
        return 1;
      } else {
        return 0;
      }
    });
    return [
      {
        move: "discardGems",
        args: [discardingGems],
      },
    ];
  }

  // build
  buildCard(G, currentPlayer, moves);

  // build from reserve
  currentPlayer.reservedCards.forEach((card, index) => {
    if (playerCanAffordCard(card, currentPlayer)) {
      moves.push({
        move: "buildFromReserve",
        args: [index],
      });
    }
  });

  if (moves.length > 0) {
    return moves;
  }

  // if user has 9 gems, they should reserve card rather than picking gems
  if (getTotalCount(currentPlayer.gems) >= gemsInHandLimit - 1) {
    reserveCards(G, moves);

    if (moves.length > 0) {
      return moves;
    }
  }

  const gems = G.gems.slice(0, 5);
  // pick
  // 2 gems of same kind
  gems.forEach((gem, index) => {
    if (gem > 3) {
      const arr = Array(5).fill(0);
      arr[index] = 2;
      moves.push({
        move: "pick",
        args: [arr],
      });
    }
  });

  const permutations: number[][] = permute(gems);
  let highestTotalCount = 0;
  permutations.forEach((p) => {
    highestTotalCount = Math.max(highestTotalCount, getTotalCount(p));
  });

  permutations.forEach((p) => {
    // Naive strategy to only pick the most gems
    if (getTotalCount(p) === highestTotalCount) {
      moves.push({
        move: "pick",
        args: [p],
      });
    }
  });

  shuffleArray(moves);
  if (moves.length > 0) {
    return moves;
  }

  // reserve
  reserveCards(G, moves);

  if (moves.length === 0) {
    moves.push({ event: "endTurn" });
  }
  return moves;
};

const buildCard = (
  G: GameState,
  currentPlayer: Player,
  moves: AiEnumerate
): void => {
  G.cardsOnTable.forEach((cardsAtLevel, rowIndex) => {
    cardsAtLevel.forEach((card, columnIndex) => {
      if (card !== undefined) {
        if (playerCanAffordCard(card, currentPlayer)) {
          moves.push({
            move: "build",
            args: [rowIndex, columnIndex],
          });
        }

        // might need to pick noble
        pickNobles(G, currentPlayer, moves);
      }
    });
  });
};

const pickNobles = (
  G: GameState,
  currentPlayer: Player,
  moves: AiEnumerate
): void => {
  const nonAcquiredNobles = G.nobles.filter((noble) => !noble.acquired);
  if (playerIsEligibleToPickSomeNobles(currentPlayer, nonAcquiredNobles)) {
    moves.push({
      move: "pickNoble",
      args: [Math.floor(Math.random() * nonAcquiredNobles.length)],
    });
  }
};

const reserveCards = (G: GameState, moves: AiEnumerate): void => {
  G.cardsOnTable.forEach((cardsAtLevel, rowIndex) => {
    cardsAtLevel.forEach((card, columnIndex) => {
      if (card !== undefined) {
        moves.push({
          move: "reserve",
          args: [rowIndex, columnIndex],
        });
      }
    });
  });
  shuffleArray(moves);
};

const permute = (gems: number[]): number[][] => {
  const perm: number[] = [],
    perms: number[][] = [];
  const p = (count: number) => {
    if (perm.length === 5) {
      if (perm.some((g) => g === 1)) {
        perms.push([...perm]);
      }

      return;
    }

    if (count < 3 && gems[perm.length] > 0) {
      perm.push(1);
      p(count + 1);
      perm.pop();
    }

    perm.push(0);
    p(count);
    perm.pop();
  };
  p(0);

  return perms;
};

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
