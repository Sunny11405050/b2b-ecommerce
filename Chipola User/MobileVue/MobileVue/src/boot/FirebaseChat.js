import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebaseCollectionEnum = {
  chats: "chats",
  limit: 500,
};

const firebaasApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaasApp);

export { firebaseDb, firebaseCollectionEnum };
