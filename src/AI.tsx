import { Ctx } from "boardgame.io";
import { GameState } from "./Interfaces";
import { playerCanAffordCard } from "./components/CardDialog";
import { gemsInHandLimit, getTotalCount } from "./Moves";

export const enumerateAIMoves = (G: GameState, ctx: Ctx) => {
  const moves: any[] = [];

  // discard
  if (
    ctx.activePlayers != null &&
    ctx.activePlayers[Number(ctx.currentPlayer)] === "DiscardGems"
  ) {
    let diff =
      getTotalCount(G.players[Number(ctx.currentPlayer)].gems) -
      gemsInHandLimit;
    const discardingGems = G.players[Number(ctx.currentPlayer)].gems.map(
      (gem) => {
        if (gem > 0 && diff > 0) {
          diff--;
          return 1;
        } else {
          return 0;
        }
      }
    );
    return [
      {
        move: "discardGems",
        args: [discardingGems],
      },
    ];
  }

  // build
  G.cardsOnTable.forEach((cardsAtLevel, rowIndex) => {
    cardsAtLevel.forEach((card, columnIndex) => {
      if (card !== undefined) {
        if (playerCanAffordCard(card, G.players[Number(ctx.currentPlayer)])) {
          moves.push({
            move: "build",
            args: [rowIndex, columnIndex],
          });
        }
      }
    });
  });

  if (moves.length > 0) {
    return moves;
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

  if (moves.length > 0) {
    return moves;
  }

  // reserve
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

  return moves;
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
