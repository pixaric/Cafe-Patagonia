
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

  // 🔐 Tu configuración real de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDFdTREJvegUdsOUc7A0-NTOvKemQmTGyI", // ← reemplaza con tu clave real
    authDomain: "pedidosqr-34bea.firebaseapp.com",
    projectId: "pedidosqr-34bea",
    storageBucket: "pedidosqr-34bea.appspot.com",
    messagingSenderId: "743534119824",
    appId: "1:743534119824:web:17cf79d3b6952380084115" // ← reemplaza con tu appId real
  };

  // 🔌 Inicializa Firebase y Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // ✅ Función para guardar el pedido
  async function guardarPedidoEnFirestore(pedidoId, mesa, productos) {
    const fecha = new Date().toISOString();
    await setDoc(doc(db, "pedidos", pedidoId), {
      fecha,
      mesa,
      productos
    });
    console.log(`✅ Pedido ${pedidoId} guardado en Firestore`);
  }

  // ✅ Evento del botón Finalizar Pedido
  document.getElementById("finalizarPedidoBtn").addEventListener("click", () => {
    const mesa = document.getElementById("table-number").value || "Sin número";
    const pedidoId = `PED-${Date.now()}`;

    // 🔁 Aquí debes usar tu carrito real
    const cart = [
      { name: "Café", quantity: 2, note: "Sin azúcar" },
      { name: "Croissant", quantity: 1, note: "" }
    ];

    if (cart.length === 0) {
      alert("❌ El carrito está vacío.");
      return;
    }

    guardarPedidoEnFirestore(pedidoId, mesa, cart);
  });

  //////////////////
/*  // Prueba directa: guardar un pedido de ejemplo
const pedidoId = `TEST-${Date.now()}`;
const mesa = "Prueba";
const productos = [
  { name: "Test Café", quantity: 1, note: "Sin azúcar" },
  { name: "Test Croissant", quantity: 2, note: "" }
];

setDoc(doc(db, "pedidos", pedidoId), {
  fecha: new Date().toISOString(),
  mesa,
  productos
}).then(() => {
  console.log("✅ Conexión confirmada: pedido de prueba guardado");
}).catch((error) => {
  console.error("❌ Error al conectar con Firestore:", error);
});
*/

document.getElementById("finalizarPedidoBtn").addEventListener("click", () => {
  const pedidoId = `PED-${Date.now()}`;

  if (!window.cart || window.cart.length === 0) {
    alert("❌ El carrito está vacío.");
    return;
  }

  guardarPedidoEnFirestore(pedidoId, window.cart);
});
