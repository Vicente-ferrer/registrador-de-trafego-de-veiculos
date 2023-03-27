import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // here is your fiebase autenticatios infos
  // apiKey: ,
  // authDomain:
  // projectId:
  // storageBucket:
  // messagingSenderId:
  // appId:
  // measurementId:
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = getAuth(app);
export { firebase, db, auth };
