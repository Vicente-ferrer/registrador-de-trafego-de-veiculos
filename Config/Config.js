import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1-v73Mmdoz_AOFg0E1WPxD47zg22mIDc",
  authDomain: "virtu-db.firebaseapp.com",
  projectId: "virtu-db",
  storageBucket: "virtu-db.appspot.com",
  messagingSenderId: "963670423068",
  appId: "1:963670423068:web:2002253d100df649cbd1d9",
  measurementId: "G-VPN3RJWWKJ",
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = getAuth(app);
export { firebase, db, auth };
