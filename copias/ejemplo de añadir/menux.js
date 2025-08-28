import { menuItemsContainer } from './domx.js';

export function renderMenu() {
  menuItemsContainer.innerHTML = '';

  const item = {
    id: 1,
    name: 'Café',
    description: 'Café negro intenso',
    price: 1.5
  };

  const menuItem = document.createElement('div');
  menuItem.className = 'menu-item';
  menuItem.innerHTML = `
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p>€${item.price.toFixed(2)}</p>
    <div class="add-controls">
      <button class="quantity-change-btn" data-id="${item.id}" data-change="-1">-</button>
      <input type="number" value="1" min="1" class="quantity-input" data-id="${item.id}">
      <button class="quantity-change-btn" data-id="${item.id}" data-change="1">+</button>
      <button class="add-to-cart-btn" data-id="${item.id}">Añadir</button>
    </div>
  `;
  menuItemsContainer.appendChild(menuItem);
}
