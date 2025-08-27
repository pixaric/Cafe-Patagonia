import { cart } from './cart.js';
import { tableNumberInput } from './dom.js';

export function generarQR() {
  console.log('Generando QR...');

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

  // ✅ Mostrar el pedido completo en texto
  const pedidoTexto = cart.map(item => {
    return `• ${item.quantity}x ${item.name}`;
  }).join('\n');

  const textoVisible = `Mesa: ${mesa}\n\nPedido:\n${pedidoTexto}`;
  ticketContent.textContent = textoVisible;

  // ✅ Generar QR con un identificador compacto
  const pedidoId = `PED-${Date.now()}`;
  const qr = new QRCode(qrDiv, {
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.L
  });

  qr.makeCode(pedidoId);
}
