import { SplendorGame } from "./SplendorGame";
import { SplendorBoard } from "../components/SplendorBoard";
import { DelayedRandomBot } from "./DelayedRandomBot";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";

export const SplendorClient = Client({
  game: SplendorGame,
  board: SplendorBoard,
  numPlayers: 3,
  multiplayer: Local({
    persist: true,
    bots: { "1": DelayedRandomBot, "2": DelayedRandomBot },
  }),
});
