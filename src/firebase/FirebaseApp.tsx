import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAap1dQ_qvsOUPiuwSMwhN75Kw2AMMeZQE",
  authDomain: "splendor-web.firebaseapp.com",
  projectId: "splendor-web",
  storageBucket: "splendor-web.appspot.com",
  messagingSenderId: "687216120103",
  appId: "1:687216120103:web:a45ac612b65cdb7d74d902",
  measurementId: "G-KV317L31DG",
  databaseURL: "https://splendor-web-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);
