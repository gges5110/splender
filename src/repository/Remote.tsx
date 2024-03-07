import { User } from "src/Atoms";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { database } from "src/firebase/FirebaseApp";

export const loadGameToLocal = async (user: User) => {
  if (!user) {
    return Promise.resolve();
  }

  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `users/${user?.uid}`));
    if (snapshot.exists()) {
      const value = snapshot.val();
      const sessionId = value.sessionId;
      if (sessionId === window.navigator.userAgent) {
        console.log("Same browser session, skip loading");
        return Promise.resolve("sameSession");
      }

      localStorage.setItem("bgio_metadata", value.metadata);
      localStorage.setItem("bgio_state", value.state);
      localStorage.setItem("bgio_initial", value.initial);
      localStorage.setItem("bgio_log", value.log);
      localStorage.setItem("localAiInfo", value.localAiInfo);

      return Promise.resolve("success");
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
};

export const saveGameToRemote = () => {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) {
    return;
  }
  const user = JSON.parse(rawUser);

  if (!user) {
    console.log("no user, skip saving");
    return;
  }

  const metadata = localStorage.getItem("bgio_metadata");
  const state = localStorage.getItem("bgio_state");
  const initial = localStorage.getItem("bgio_initial");
  const log = localStorage.getItem("bgio_log");
  const localAiInfo = localStorage.getItem("localAiInfo");
  set(ref(database, "users/" + user.uid), {
    metadata,
    state,
    initial,
    log,
    localAiInfo,
    sessionId: window.navigator.userAgent,
    updateTimestamp: new Date().toISOString(),
  }).then(() => {
    console.log("saved game state to server");
  });
};
