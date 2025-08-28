import { generarQR } from './qr.js';
import { renderMenu, renderCategories } from './menu.js';
import { addToCart, updateQuantity, renderCart, cart } from './cart.js'; // asegúrate de exportar `cart`
import { generateWhatsAppMessage, generateTicketText } from './ticket.js';
import { initAudio, playSound } from './audio.js';
import {
  menuItemsContainer,
  cartItemsContainer,
  tableNumberInput,
  placeOrderBtn,
  closeModalBtn,
  newOrderBtn,
  modalContainer
} from './dom.js';
import { showOrderModal, hideOrderModal, resetOrder } from './modal.js';
import { menuData } from './data.js';



console.log('Productos cargados:', menuData);






// Inicializa la interfaz
renderCategories();
renderMenu();
document.body.addEventListener('click', initAudio, { once: true });

menuItemsContainer.addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;
  const itemId = parseInt(btn.dataset.id);
  addToCart(itemId, 1);
});

cartItemsContainer.addEventListener('click', e => {
  const btn = e.target.closest('.quantity-btn');
  if (!btn) return;
  const itemId = parseInt(btn.dataset.id);
  const change = parseInt(btn.dataset.change);
  updateQuantity(itemId, change);
});

placeOrderBtn.addEventListener('click', () => {
  const ticket = generateTicketText();
  showOrderModal(ticket);
});

closeModalBtn.addEventListener('click', hideOrderModal);
newOrderBtn.addEventListener('click', resetOrder);
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) hideOrderModal();
});

document.body.insertAdjacentHTML('beforeend', '<p style="color:red;">App cargada correctamente</p>');
console.log('Elemento totalPriceEl:', document.getElementById('total-price'));



// ✅ Evento del botón Finalizar Pedido
document.getElementById('finalizarPedidoBtn').addEventListener('click', async () => {
  const canvas = document.getElementById('qrcode');
  const ticketContent = document.getElementById('ticket-content');
  const qrContainer = document.getElementById('qrContainer');
  const mesa = tableNumberInput.value || 'Sin número';

  if (cart.length === 0) {
    ticketContent.textContent = '❌ El carrito está vacío.';
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const pedidoId = `PED-${Date.now()}`;
  const fecha = new Date().toISOString();

  // Mostrar el contenido del pedido
  const pedidoTexto = cart.map(item => `• ${item.quantity}x ${item.name} (${item.note || 'Sin nota'})`).join('\n');
  const textoVisible = `Pedido: ${pedidoId}\nMesa: ${mesa}\n\n${pedidoTexto}`;
  ticketContent.textContent = textoVisible;

  // Generar el QR con el ID del pedido
  new QRious({
    element: canvas,
    value: pedidoId,
    size: 256,
    level: 'L'
  });

  qrContainer.style.display = 'block';

 
});


