import {
  modalContainer,
  closeModalBtn,
  newOrderBtn,
  tableNumberInput,
  placeOrderBtn
} from './dom.js';

import { cart, renderCart } from './cart.js';



export function showOrderModal(ticketText) {
  ticketContentEl.textContent = ticketText;

  qrCodeContainer.innerHTML = '';
  new EasyQRCode(qrCodeContainer, {
    text: ticketText,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: EasyQRCode.CorrectLevel.H
  });

  modalContainer.classList.remove('hidden');
}

export function hideOrderModal() {
  modalContainer.classList.add('hidden');
}

export function resetOrder() {
  hideOrderModal();
  if (cart.length > 0) {
    cart = [];
    renderCart();
    tableNumberInput.value = '';
  }
}

placeOrderBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    sendOrderViaWhatsApp();
  }
});

closeModalBtn.addEventListener('click', hideOrderModal);
newOrderBtn.addEventListener('click', resetOrder);
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    hideOrderModal();
  }
});


