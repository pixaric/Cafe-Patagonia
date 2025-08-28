import { menuItemsContainer } from './domx.js';

menuItemsContainer.addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('quantity-change-btn')) {
    const addControls = target.closest('.add-controls');
    const input = addControls.querySelector('.quantity-input');
    const change = parseInt(target.dataset.change);
    let currentValue = parseInt(input.value);
    currentValue = isNaN(currentValue) ? 1 : currentValue + change;
    input.value = Math.max(1, currentValue);
    console.log('Cantidad actualizada:', input.value);
  }

  if (target.classList.contains('add-to-cart-btn')) {
    const input = target.closest('.add-controls').querySelector('.quantity-input');
    const quantity = parseInt(input.value) || 1;
    console.log(`Añadiendo al carrito: ${quantity} unidades`);
    input.value = '1';
  }
});
