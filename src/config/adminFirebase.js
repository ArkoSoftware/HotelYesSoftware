import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGSjg0g3CNIcBWmf-aRmqrAYMuxfAGHwU",
  authDomain: "yesapp-sid.firebaseapp.com",
  databaseURL: "https://yesapp-sid-default-rtdb.firebaseio.com",
  projectId: "yesapp-sid",
  storageBucket: "yesapp-sid.appspot.com",
  messagingSenderId: "72169464275",
  appId: "1:72169464275:web:2f45901332eee8ebaf0f26",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, db, storage, database };
