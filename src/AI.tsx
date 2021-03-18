import { Ctx } from "boardgame.io";
import { GameState } from "./Interfaces";

export const enumerateAIMoves = (G: GameState, ctx: Ctx) => {
  const moves: any[] = [];
  const gems = G.gems;
  // pick
  // 2 gems of same kind
  gems.slice(0, 5).forEach((gem, index) => {
    if (gem > 3) {
      const arr = Array(5).fill(0);
      arr[index] = 2;
      moves.push({
        move: "pick",
        args: [arr],
      });
    }
  });
  permute(gems).forEach((p) => {
    moves.push({
      move: "pick",
      args: [p],
    });
  });

  // build
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
