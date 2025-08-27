function generateTicketText() {
  const now = new Date();
  const date = now.toLocaleDateString('es-ES');
  const time = now.toLocaleTimeString('es-ES');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let ticket = `****** Pedido ******\n`;
  ticket += `Café Patagonia\n`;
  ticket += `Fecha: ${date} ${time}\n`;
  ticket += `------------------------------\n`;
  ticket += `Cant.  Producto          Total\n`;
  ticket += `------------------------------\n`;

  cart.forEach(item => {
    const name = item.name.padEnd(18, ' ').substring(0, 18);
    const quantity = String(item.quantity).padStart(2, ' ');
    const itemTotal = (item.price * item.quantity).toFixed(2).padStart(7, ' ');
    ticket += `${quantity}   ${name} ${itemTotal}\n`;
  });

  ticket += `------------------------------\n`;
  ticket += `TOTAL: ${('€'+total.toFixed(2)).padStart(23, ' ')}\n`;
  ticket += `\n¡Gracias por su visita!`;
  return ticket;
}

function generarQR() {
  const qrContainer = document.getElementById("qrcode");
  const ticketContentEl = document.getElementById("ticket-content");

  if (!qrContainer || !ticketContentEl) {
    console.warn("⚠️ No se encontró el contenedor del QR o del ticket.");
    return;
  }

  qrContainer.innerHTML = ""; // Limpia el QR anterior

  const ticketText = generateTicketText();
  ticketContentEl.textContent = ticketText;

  new QRCode(qrContainer, {
    text: ticketText,
    width: 250,
    height: 250
  });
}

<button onclick="mostrarBotonQR()">Finalizar pedido</button>
document.getElementById("verQRBtn").addEventListener("click", () => {
  generarQR(); // Usa tu función existente
});


document.getElementById("verQRBtn").addEventListener("click", () => {
  generarQR(); // ✅ Esta es la función que se ejecuta en el paso 3
});
