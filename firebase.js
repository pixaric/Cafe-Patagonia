// firebase.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFdTREJvegUdsOUc7A0-NTOvKemQmTGyI",
  authDomain: "pedidosqr-34bea.firebaseapp.com",
  projectId: "pedidosqr-34bea",
  storageBucket: "pedidosqr-34bea.firebasestorage.app",
  messagingSenderId: "743534119824",
  appId: "1:743534119824:web:17cf79d3b6952380084115"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

export async function guardarPedidoEnFirestore(pedidoId, productos) {
  const fecha = new Date().toISOString();
  await setDoc(doc(db, "pedidos", pedidoId), { fecha, productos });
  console.log(`✅ Pedido ${pedidoId} guardado en Firestore`);
}
