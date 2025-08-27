import { totalPriceEl } from './dom.js';

import { menuData } from './data.js';
import { cartItemsContainer } from './dom.js';
import { playSound } from './audio.js';


export let cart = [];

export function addToCart(itemId, quantity) {
  if (quantity <= 0) return;
  playSound('add_item.mp3');
  const itemInCart = cart.find(item => item.id === itemId);
  if (itemInCart) {
    itemInCart.quantity += quantity;
  } else {
    const itemToAdd = menuData.find(item => item.id === itemId);
    cart.push({ ...itemToAdd, quantity: quantity });
  }
  renderCart();
}

export function updateQuantity(itemId, change){
  const itemInCart = cart.find(item => item.id === itemId);
  if (itemInCart) {
    itemInCart.quantity += change;
    if (itemInCart.quantity <= 0) {
      cart = cart.filter(item => item.id !== itemId);
    }
  }
  renderCart();
}

export function renderCart()  {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
  } else {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <div class="cart-item-quantity">
          <button class="quantity-btn" data-id="${item.id}" data-change="-1">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" data-id="${item.id}" data-change="1">+</button>
        </div>
        <span class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-item-btn" data-id="${item.id}">&times;</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  updateTotal();

  if (typeof generarQR === "function" && cart.length > 0) {
    generarQR();
  }
}

/*export function updateTotal()  {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.textContent = `€${total.toFixed(2)}`;
  placeOrderBtn.disabled = cart.length === 0;
}
*/
export function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.textContent = `€${total.toFixed(2)}`;
}
