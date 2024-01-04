import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC6yU0ccgnUqOh7-8bJ0LXRc0VHTxwChns",
  authDomain: "chatunify-47457.firebaseapp.com",
  projectId: "chatunify-47457",
  storageBucket: "chatunify-47457.appspot.com",
  messagingSenderId: "570940649333",
  appId: "1:570940649333:web:29ac3ea8f5eb1ab2afed3c",
  measurementId: "G-Z241SQKLNN",
};

if (!getApps.length) {
  initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };
