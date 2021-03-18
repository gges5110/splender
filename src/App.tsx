import "./App.css";
import { Client } from "boardgame.io/react";
import { SplendorBoard } from "./components/SplendorBoard";
import { SplendorGame } from "./SplendorGame";

const App = Client({
  game: SplendorGame,
  // @ts-ignore
  board: SplendorBoard,
  numPlayers: 3,
  debug: false,
});

export default App;
