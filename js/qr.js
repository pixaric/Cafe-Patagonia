export function generarQR(cart, mesa) {
  const canvas = document.getElementById('qrcode');
  const ticketContent = document.getElementById('ticket-content');
  const qrContainer = document.getElementById('qrContainer');

  if (!canvas || !ticketContent || !qrContainer) return;

  if (!Array.isArray(cart) || cart.length === 0) {
    ticketContent.textContent = '❌ El carrito está vacío.';
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const pedidoTexto = cart.map(item => `• ${item.quantity}x ${item.name}`).join('\n');
  const textoVisible = `Mesa: ${mesa || 'Sin número'}\n\nPedido:\n${pedidoTexto}`;
  ticketContent.textContent = textoVisible;

  const pedidoId = `PED-${Date.now()}`;
  const pedidoData = { mesa, pedido: cart };
  localStorage.setItem(pedidoId, JSON.stringify(pedidoData));

  new QRious({
    element: canvas,
    value: pedidoId,
    size: 256,
    level: 'L'
  });

  qrContainer.style.display = 'block';
}

document.getElementById('finalizarPedidoBtn').addEventListener('click', () => {
  const canvas = document.getElementById('qrcode');
  const ticketContent = document.getElementById('ticket-content');

  // Simulación: filtrar productos con cantidad > 0
  const cart = productos.filter(p => p.quantity > 0); // productos debe estar definido globalmente

  if (cart.length === 0) {
    ticketContent.textContent = '❌ El carrito está vacío.';
    return;
  }

  const mesa = '5'; // puedes tomarla de un input si lo tienes

  const pedidoTexto = cart.map(item => `• ${item.quantity}x ${item.name}`).join('\n');
  const textoVisible = `Mesa: ${mesa}\n\nPedido:\n${pedidoTexto}`;
  ticketContent.textContent = textoVisible;

  const pedidoId = `PED-${Date.now()}`;
  const pedidoData = { mesa, pedido: cart };
  localStorage.setItem(pedidoId, JSON.stringify(pedidoData));

  new QRious({
    element: canvas,
    value: pedidoId,
    size: 256,
    level: 'L'
  });
});
