import { menuData } from './data.js';
import { menuCategoriesContainer, menuItemsContainer } from './dom.js';

// Mapeo de alérgenos a emojis y nombres
const allergenEmojis = {
  gluten: { emoji: '🍞', name: 'Gluten' },
  lactose: { emoji: '🥛', name: 'Lactosa' },
  nuts: { emoji: '🥜', name: 'Frutos Secos' },
  eggs: { emoji: '🥚', name: 'Huevo' }
};

export function renderMenu(filter = 'Todos') {
  menuItemsContainer.innerHTML = '';
  const filteredData = filter === 'Todos' ? menuData : menuData.filter(item => item.category === filter);

  filteredData.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';

    const allergensHtml = item.allergens.map(allergen => {
      const allergenInfo = allergenEmojis[allergen];
      return allergenInfo ? `<span title="${allergenInfo.name}">${allergenInfo.emoji}</span>` : '';
    }).join(' ');

    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <h3>${item.name}</h3>
        <p class="item-description">${item.description}</p>
        <p class="item-price">€${item.price.toFixed(2)}</p>
        <div class="item-allergens">${allergensHtml}</div>
        <div class="add-controls">
          <button class="quantity-change-btn" data-id="${item.id}" data-change="-1">-</button>
          <input type="number" value="1" min="1" class="quantity-input" data-id="${item.id}">
          <button class="quantity-change-btn" data-id="${item.id}" data-change="1">+</button>
          <button class="add-to-cart-btn" data-id="${item.id}">Añadir</button>
        </div>
      </div>
    `;
    menuItemsContainer.appendChild(menuItem);
  });
}

export function renderCategories() {
  const categories = ['Todos', ...new Set(menuData.map(item => item.category))];
  menuCategoriesContainer.innerHTML = '';
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = category;
    if (category === 'Todos') btn.classList.add('active');

    btn.addEventListener('click', () => {
      document.querySelector('.category-btn.active').classList.remove('active');
      btn.classList.add('active');
      renderMenu(category);
    });

    menuCategoriesContainer.appendChild(btn);
  });
}
