import { Server, Origins } from "boardgame.io/server";
import { SplendorGame } from "../engine/SplendorGame";

const server = Server({
  // Provide the definitions for your game(s).
  games: [SplendorGame],

  // Provide the database storage class to use.
  // db: new DbConnector(),

  origins: [Origins.LOCALHOST, "http://127.0.0.1:5173"],
});

server.run(8000, () => console.log("server running..."));
