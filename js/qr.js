import { cart } from './cart.js';
import { tableNumberInput } from './dom.js';

export function generarQR() {
  const qrDiv = document.getElementById('qrcode');
  const qrContainer = document.getElementById('qrContainer');
  const ticketContent = document.getElementById('ticket-content');
  if (!qrDiv || !qrContainer || !ticketContent) return;

  qrContainer.style.display = 'block';
  qrDiv.innerHTML = '';
  ticketContent.textContent = '';

  if (cart.length === 0) {
    qrDiv.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  const mesa = tableNumberInput.value || 'Sin número';
  const pedidoId = `PED-${Date.now()}`;
  const pedidoData = {
    mesa,
    pedido: cart.map(item => ({
      name: item.name,
      quantity: item.quantity
    }))
  };

  // Simulación: guardar en localStorage
  localStorage.setItem(pedidoId, JSON.stringify(pedidoData));

  // Mostrar el pedido en texto
  const textoVisible = `Mesa: ${mesa}\n\nPedido:\n` +
    pedidoData.pedido.map(item => `• ${item.quantity}x ${item.name}`).join('\n');
  ticketContent.textContent = textoVisible;

  // Generar QR con enlace único
  const enlaceQR = `https://tusitio.com/pedido.html?id=${pedidoId}`;
  const qr = new QRCode(qrDiv, {
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.L
  });

  qr.makeCode(enlaceQR);
}
