// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFdTREJvegUdsOUc7A0-NTOvKemQmTGyI",
  authDomain: "pedidosqr-34bea.firebaseapp.com",
  databaseURL: "https://pedidosqr-34bea-default-rtdb.firebaseio.com",
  projectId: "pedidosqr-34bea",
  storageBucket: "pedidosqr-34bea.appspot.com",
  messagingSenderId: "743534119824",
  appId: "1:743534119824:web:17cf79d3b6952380084115"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
