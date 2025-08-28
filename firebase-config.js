// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFdTREJvegUdsOUc7A0-NTOvKemQmTGyI",
  authDomain: "pedidosqr-34bea.firebaseapp.com",
  projectId: "pedidosqr-34bea",
  storageBucket: "pedidosqr-34bea.firebasestorage.app",
  messagingSenderId: "743534119824",
  appId: "1:743534119824:web:17cf79d3b6952380084115",
  databaseURL: "https://pedidosqr-34bea-default-rtdb.europe-west1.firebasedatabase.app"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
