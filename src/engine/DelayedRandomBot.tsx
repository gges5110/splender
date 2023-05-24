import { RandomBot } from "boardgame.io/ai";
import { Ctx, PlayerID } from "boardgame.io";

export class DelayedRandomBot extends RandomBot {
  private timeout = 500;

  play({ G, ctx }: { G: any; ctx: Ctx }, playerID: PlayerID) {
    return new Promise<{
      action:
        | {
            type: "MAKE_MOVE";
            payload: {
              type: string;
              args: any;
              playerID: string;
            };
          }
        | {
            type: "GAME_EVENT";
            payload: {
              type: string;
              args: any;
              playerID: string;
            };
          };
    }>((resolve) => {
      const c = super.play({ G, ctx }, playerID);
      setTimeout(() => {
        return resolve(c);
      }, this.timeout);
    });
  }
}
