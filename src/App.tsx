import "./App.css";
import { SplendorClient } from "./engine/SplendorClient";
import { useLocalStorage } from "usehooks-ts";

const App = () => {
  const [matchID] = useLocalStorage("matchID", "1");
  return <SplendorClient playerID={"0"} debug={false} matchID={matchID} />;
};

export default App;
