
import { generarQR } from './qr.js';

const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');
finalizarPedidoBtn.addEventListener('click', generarQR);




import { renderMenu, renderCategories } from './menu.js';
import { addToCart, updateQuantity, renderCart } from './cart.js';
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

renderMenu();

menuItemsContainer.addEventListener('click', e => {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;

  const itemId = parseInt(btn.dataset.id);
  console.log('Botón clicado. ID del producto:', itemId);
  addToCart(itemId, 1);
});

cartItemsContainer.addEventListener('click', e => {
  const btn = e.target.closest('.quantity-btn');
  if (!btn) return;

  const itemId = parseInt(btn.dataset.id);
  const change = parseInt(btn.dataset.change);
  updateQuantity(itemId, change); // ✅ ahora sí se usa
});

// Inicialización
renderCategories();
renderMenu();
document.body.addEventListener('click', initAudio, { once: true });

// Eventos básicos (puedes expandirlos luego)
placeOrderBtn.addEventListener('click', () => {
  const ticket = generateTicketText();
  showOrderModal(ticket);
});



// Inicialización
renderCategories();
renderMenu();
document.body.addEventListener('click', initAudio, { once: true });

// Eventos
menuItemsContainer.addEventListener('click', e => {
  
  // lógica de añadir al carrito
});

cartItemsContainer.addEventListener('click', e => {
  // lógica de modificar cantidades
});


placeOrderBtn.addEventListener('click', () => {
  // lógica de enviar pedido
});

closeModalBtn.addEventListener('click', () => {
  // cerrar modal
});

newOrderBtn.addEventListener('click', () => {
  // reiniciar pedido
});

// Inicializa la interfaz
renderCategories();
renderMenu();

// Activa el botón de enviar pedido
placeOrderBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    sendOrderViaWhatsApp();
  }
});

// Cierra el modal
closeModalBtn.addEventListener('click', hideOrderModal);
newOrderBtn.addEventListener('click', resetOrder);
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    hideOrderModal();
  }
});


document.body.insertAdjacentHTML('beforeend', '<p style="color:red;">App cargada correctamente</p>');


console.log('Elemento totalPriceEl:', document.getElementById('total-price'));


