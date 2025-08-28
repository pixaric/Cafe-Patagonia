import {
  menuItemsContainer,
  cartItemsContainer,
  tableNumberInput
} from './dom.js';

import { addToCart, updateQuantity, renderCart } from './cart.js';


tableNumberInput.addEventListener('input', () => {
  tableNumberInput.classList.remove('invalid');
});

/*menuItemsContainer.addEventListener('click', e => {
  const target = e.target;
  if (target.classList.contains('add-to-cart-btn')) {
    const itemId = parseInt(target.dataset.id);
    const input = target.closest('.add-controls').querySelector('.quantity-input');
    const quantity = parseInt(input.value);
    addToCart(itemId, quantity);
    input.value = '1';
  }
    */

  menuItemsContainer.addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('add-to-cart-btn')) {
    const itemId = parseInt(target.dataset.id);
    const input = target.closest('.add-controls').querySelector('.quantity-input');

    // ✅ Validar el valor del input
    let quantity = parseInt(input.value);
    quantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;

    addToCart(itemId, quantity);
    input.value = '1'; // Opcional: reinicia el campo después de añadir
  }
});

  /*if (target.classList.contains('quantity-change-btn')) {
    const itemId = parseInt(target.dataset.id);
    const change = parseInt(target.dataset.change);
    const input = target.closest('.add-controls').querySelector('.quantity-input');
    let currentValue = parseInt(input.value);
    currentValue += change;
    input.value = Math.max(currentValue, 1);
  }*/
  if (target.classList.contains('quantity-change-btn')) {
  const addControls = target.closest('.add-controls');
  if (!addControls) return;

  const input = addControls.querySelector('.quantity-input');
  if (!input) return;

  let currentValue = parseInt(input.value);
  const change = parseInt(target.dataset.change);

  currentValue = isNaN(currentValue) ? 1 : currentValue + change;
  input.value = Math.max(1, currentValue);
}


cartItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('quantity-btn')) {
    const itemId = parseInt(e.target.dataset.id);
    const change = parseInt(e.target.dataset.change);
    updateQuantity(itemId, change);
  }
  if (e.target.classList.contains('remove-item-btn')) {
    const itemId = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
  }
});

import { generarQR } from './qr.js';

document.getElementById('place-order-btn').addEventListener('click', () => {
  generarQR();
});



