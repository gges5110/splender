import { SplendorGame } from "./SplendorGame";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { SplendorBoard } from "../components/GameBoard/SplendorBoard";

export const SplendorClient = Client({
  game: SplendorGame,
  board: SplendorBoard,
  numPlayers: 3,
  // multiplayer: Local({
  //   persist: true,
  //   bots: { "1": DelayedRandomBot, "2": DelayedRandomBot },
  // }),
  multiplayer: SocketIO({ server: "localhost:8000" }),
});
