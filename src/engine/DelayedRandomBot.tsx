import { RandomBot } from "boardgame.io/ai";
import { Ctx, PlayerID } from "boardgame.io";

export class DelayedRandomBot extends RandomBot {
  private timeout = 500;

  play({ G, ctx }: { G: any; ctx: Ctx }, playerID: PlayerID) {
    return new Promise<{
      action:
        | {
            payload: {
              args: any;
              playerID: string;
              type: string;
            };
            type: "MAKE_MOVE";
          }
        | {
            payload: {
              args: any;
              playerID: string;
              type: string;
            };
            type: "GAME_EVENT";
          };
    }>((resolve) => {
      const c = super.play({ G, ctx }, playerID);
      setTimeout(() => {
        return resolve(c);
      }, this.timeout);
    });
  }
}
