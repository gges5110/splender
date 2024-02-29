import { Server, Origins } from "boardgame.io/server";
import { SplendorGame } from "../engine/SplendorGame";

const server = Server({
  games: [SplendorGame],

  origins: [
    Origins.LOCALHOST,
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5173/splender/lobby",
  ],
});
server.router.delete("/matches", async (ctx, next) => {
  const { db } = server;
  const staleMatchIDs = await db.listMatches();
  console.log("number of match ids", staleMatchIDs.length);
  // Delete matches one-by-one. Could also use a queue or parallel system here.
  for (const id of staleMatchIDs) {
    await db.wipe(id);
  }

  ctx.body = `Deleted ${staleMatchIDs.length} matches`;
});

server.run(8002, () => console.log("server running..."));
