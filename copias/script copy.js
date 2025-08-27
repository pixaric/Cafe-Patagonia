document.addEventListener('DOMContentLoaded', () => {
    const menuData = [
        // Cafés
        { id: 1, name: 'Expresso', category: 'Cafés', price: 1.20, image: 'images/espresso.png', description: 'Café solo, corto e intenso.', allergens: [] },
        { id: 2, name: 'Cortado', category: 'Cafés', price: 1.30, image: 'images/cortado.png', description: 'Espresso con una pequeña cantidad de leche.', allergens: ['lactose'] },
        { id: 3, name: 'Café con Leche', category: 'Cafés', price: 1.40, image: 'images/latte.png', description: 'El clásico, mitad café y mitad leche.', allergens: ['lactose'] },
        { id: 4, name: 'Café Americano', category: 'Cafés', price: 1.40, image: 'images/americano.png', description: 'Espresso diluido con agua caliente.', allergens: [] },
        { id: 5, name: 'Café Bombón', category: 'Cafés', price: 1.50, image: 'images/cafe_bombon.png', description: 'Espresso con leche condensada.', allergens: ['lactose'] },
        { id: 6, name: 'Café con Hielo', category: 'Cafés', price: 1.40, image: 'images/iced_coffee.png', description: 'Café servido con un vaso de hielo aparte.', allergens: [] },
        { id: 7, name: 'Capuccino', category: 'Cafés', price: 1.50, image: 'images/cappuccino.png', description: 'Espresso, leche vaporizada y espuma de leche.', allergens: ['lactose'] },
        { id: 8, name: 'Café Descafeinado', category: 'Cafés', price: 1.40, image: 'images/decaf_coffee.png', description: 'Todo el sabor, sin cafeína.', allergens: [] },
        { id: 9, name: 'Té', category: 'Cafés', price: 1.40, image: 'images/tea.png', description: 'Variedad de tés e infusiones.', allergens: [] },
        { id: 10, name: 'Cola Cao', category: 'Cafés', price: 1.50, image: 'images/cola_cao.png', description: 'Leche con cacao en polvo, un clásico.', allergens: ['lactose'] },

        // Desayunos
        { id: 11, name: 'Tostada con Mantequilla y Mermelada', category: 'Desayunos', price: 1.50, image: 'images/tostada_mermelada.png', description: 'Tostada de pan de pueblo clásica.', allergens: ['gluten'] },
        { id: 12, name: 'Tostada con Tomate y Aceite', category: 'Desayunos', price: 1.50, image: 'images/tostada_tomate.png', description: 'La tostada mediterránea por excelencia.', allergens: ['gluten'] },
        { id: 13, name: 'Tostada con Jamón y Tomate', category: 'Desayunos', price: 2.00, image: 'images/tostada_jamon.png', description: 'Jamón serrano sobre pan con tomate y aceite.', allergens: ['gluten'] },
        { id: 14, name: 'Croissant', category: 'Desayunos', price: 1.50, image: 'images/croissant.png', description: 'Hojaldre de mantequilla, tierno y crujiente.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 15, name: 'Croissant Mixto', category: 'Desayunos', price: 2.50, image: 'images/croissant_mixto.png', description: 'Relleno de jamón york y queso fundido.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 16, name: 'Napolitana de Chocolate', category: 'Desayunos', price: 1.50, image: 'images/napolitana.png', description: 'Deliciosa masa hojaldrada rellena de chocolate.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 17, name: 'Donut', category: 'Desayunos', price: 1.50, image: 'images/donut.png', description: 'Clásico donut glaseado.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 18, name: 'Muffin', category: 'Desayunos', price: 1.50, image: 'images/muffin.png', description: 'Muffin con pepitas de chocolate.', allergens: ['gluten', 'lactose', 'eggs'] },
        
        // Bocadillos
        { id: 19, name: 'Bocadillo de Jamón', category: 'Bocadillos', price: 3.00, image: 'images/bocadillo_jamon.png', description: 'Bocadillo de jamón serrano y aceite de oliva.', allergens: ['gluten'] },
        { id: 20, name: 'Bocadillo de Jamón y Queso', category: 'Bocadillos', price: 3.50, image: 'images/bocadillo_jamon_queso.png', description: 'El combinado perfecto en pan de barra.', allergens: ['gluten', 'lactose'] },
        { id: 21, name: 'Bocadillo de Queso', category: 'Bocadillos', price: 3.00, image: 'images/bocadillo_queso.png', description: 'Queso manchego en pan de barra.', allergens: ['gluten', 'lactose'] },
        { id: 22, name: 'Bocadillo de Chorizo', category: 'Bocadillos', price: 3.00, image: 'images/bocadillo_chorizo.png', description: 'Chorizo ibérico en pan crujiente.', allergens: ['gluten'] },
        { id: 23, name: 'Bocadillo de Salchichón', category: 'Bocadillos', price: 3.00, image: 'images/bocadillo_salchichon.png', description: 'Salchichón ibérico de bellota.', allergens: ['gluten'] },
        { id: 24, name: 'Bocadillo de Atún con Tomate', category: 'Bocadillos', price: 3.50, image: 'images/bocadillo_atun.png', description: 'Atún en aceite de oliva con tomate triturado.', allergens: ['gluten'] },
        { id: 25, name: 'Bocadillo de Tortilla Francesa', category: 'Bocadillos', price: 3.50, image: 'images/bocadillo_tortilla_francesa.png', description: 'Tortilla francesa recién hecha.', allergens: ['gluten', 'eggs'] },
        { id: 26, name: 'Bocadillo de Tortilla de Patata', category: 'Bocadillos', price: 3.50, image: 'images/bocadillo_tortilla_patata.png', description: 'Un clásico que nunca falla.', allergens: ['gluten', 'eggs'] },
        { id: 27, name: 'Bocadillo de Bacon con Queso', category: 'Bocadillos', price: 4.00, image: 'images/bocadillo_bacon_queso.png', description: 'Bacon crujiente y queso fundido.', allergens: ['gluten', 'lactose'] },
        { id: 28, name: 'Bocadillo de Lomo con Queso', category: 'Bocadillos', price: 4.00, image: 'images/bocadillo_lomo_queso.png', description: 'Lomo de cerdo a la plancha con queso.', allergens: ['gluten', 'lactose'] },
        { id: 29, name: 'Bocadillo Vegetal', category: 'Bocadillos', price: 4.00, image: 'images/bocadillo_vegetal.png', description: 'Lechuga, tomate, cebolla, espárragos y mayonesa.', allergens: ['gluten', 'eggs'] },

        // Hamburguesas
        { id: 30, name: 'Hamburguesa', category: 'Hamburguesas', price: 4.00, image: 'images/hamburguesa.png', description: 'Carne de ternera, lechuga, tomate y cebolla.', allergens: ['gluten'] },
        { id: 31, name: 'Hamburguesa con Queso', category: 'Hamburguesas', price: 4.50, image: 'images/hamburguesa_queso.png', description: 'Nuestra hamburguesa clásica con queso fundido.', allergens: ['gluten', 'lactose'] },
        { id: 32, name: 'Hamburguesa Completa', category: 'Hamburguesas', price: 5.00, image: 'images/hamburguesa_completa.png', description: 'Con todo: queso, bacon, huevo frito, lechuga y tomate.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 33, name: 'Perrito Caliente', category: 'Hamburguesas', price: 3.00, image: 'images/perrito_caliente.png', description: 'Salchicha, pan y tus salsas favoritas.', allergens: ['gluten'] },

        // Platos Combinados
        { id: 34, name: 'Filete de Pollo', category: 'Platos Combinados', price: 6.00, image: 'images/filete_pollo.png', description: 'Filete de pollo a la plancha con patatas y ensalada.', allergens: [] },
        { id: 35, name: 'Filete de Ternera', category: 'Platos Combinados', price: 6.50, image: 'images/filete_ternera.png', description: 'Filete de ternera con patatas y pimientos.', allergens: [] },
        { id: 36, name: 'Lomo', category: 'Platos Combinados', price: 6.00, image: 'images/lomo_plato.png', description: 'Lomo a la plancha con patatas fritas.', allergens: [] },
        { id: 37, name: 'Huevos Fritos con Patatas', category: 'Platos Combinados', price: 4.00, image: 'images/huevos_fritos.png', description: 'Dos huevos fritos con una generosa ración de patatas.', allergens: ['eggs'] },
        
        // Refrescos
        { id: 38, name: 'Coca Cola / Zero / Light', category: 'Refrescos', price: 2.00, image: 'images/coca_cola.png', description: 'Elige tu Coca-Cola preferida.', allergens: [] },
        { id: 39, name: 'Fanta Naranja / Limón', category: 'Refrescos', price: 2.00, image: 'images/fanta.png', description: 'El refresco de burbujas con sabor a fruta.', allergens: [] },
        { id: 40, name: 'Nestea', category: 'Refrescos', price: 2.00, image: 'images/nestea.png', description: 'Té frío al limón.', allergens: [] },
        { id: 41, name: 'Aquarius', category: 'Refrescos', price: 2.00, image: 'images/aquarius.png', description: 'Bebida isotónica refrescante.', allergens: [] },
        { id: 42, name: 'Agua', category: 'Refrescos', price: 1.50, image: 'images/agua.png', description: 'Botella de agua mineral.', allergens: [] },
        { id: 43, name: 'Agua con Gas', category: 'Refrescos', price: 2.00, image: 'images/agua_gas.png', description: 'Agua mineral con gas.', allergens: [] },
        
        // Cervezas
        { id: 44, name: 'Cerveza Nacional', category: 'Cervezas', price: 2.00, image: 'images/cerveza_nacional.png', description: 'Caña o botellín de cerveza nacional.', allergens: ['gluten'] },
        { id: 45, name: 'Cerveza de Importación', category: 'Cervezas', price: 2.50, image: 'images/cerveza_importacion.png', description: 'Variedad de cervezas internacionales.', allergens: ['gluten'] },
        { id: 46, name: 'Cerveza Sin Alcohol', category: 'Cervezas', price: 2.00, image: 'images/cerveza_sin_alcohol.png', description: 'Disfruta del sabor sin alcohol.', allergens: ['gluten'] },
        { id: 47, name: 'Clara', category: 'Cervezas', price: 2.00, image: 'images/clara.png', description: 'Cerveza con limón, muy refrescante.', allergens: ['gluten'] },

        // Zumos
        { id: 48, name: 'Zumo de Naranja', category: 'Zumos', price: 2.00, image: 'images/zumo_naranja.png', description: 'Zumo de naranja natural recién exprimido.', allergens: [] },
        { id: 49, name: 'Zumo de Melocotón', category: 'Zumos', price: 2.00, image: 'images/zumo_melocoton.png', description: 'Zumo de melocotón envasado.', allergens: [] },
        { id: 50, name: 'Zumo de Piña', category: 'Zumos', price: 2.00, image: 'images/zumo_pina.png', description: 'Zumo de piña envasado.', allergens: [] },

        // Copas
        { id: 51, name: 'Ron', category: 'Copas', price: 5.00, image: 'images/ron.png', description: 'Combinado de tu ron preferido.', allergens: [] },
        { id: 52, name: 'Ginebra', category: 'Copas', price: 5.00, image: 'images/ginebra.png', description: 'Gin tonic con tónica premium.', allergens: [] },
        { id: 53, name: 'Whisky', category: 'Copas', price: 5.00, image: 'images/whisky.png', description: 'Whisky solo o con refresco.', allergens: [] },
        { id: 54, name: 'Vodka', category: 'Copas', price: 5.00, image: 'images/vodka.png', description: 'Vodka con naranja, limón o tónica.', allergens: [] },
        { id: 55, name: 'Combinado Nacional', category: 'Copas', price: 5.00, image: 'images/combinado_nacional.png', description: 'Licores nacionales con refresco.', allergens: [] },
        { id: 56, name: 'Combinado Importación', category: 'Copas', price: 6.00, image: 'images/combinado_importacion.png', description: 'Licores de importación con refresco.', allergens: [] },

        // Nuevos productos Alemanes
        // Frühstück (Desayuno)
        { id: 57, name: 'Frühstücksteller', category: 'Desayuno Alemán', price: 6.90, image: 'images/fruhstucksteller.png', description: 'Plato de desayuno con pan, mantequilla, mermelada, queso y embutido.', allergens: ['gluten', 'lactose'] },
        { id: 58, name: 'Käsefrühstück', category: 'Desayuno Alemán', price: 7.90, image: 'images/kasefruhstuck.png', description: 'Desayuno con variedad de quesos, pan y acompañamientos.', allergens: ['gluten', 'lactose'] },
        { id: 59, name: 'Vegan Frühstück', category: 'Desayuno Alemán', price: 8.90, image: 'images/vegan_fruhstuck.png', description: '🌱 Desayuno vegano con hummus, aguacate, verduras y pan integral.', allergens: ['gluten'] },

        // Frühstückskombis (Combos de desayuno)
        { id: 60, name: 'Kleines Frühstück', category: 'Combos Desayuno', price: 5.90, image: 'images/kleines_fruhstuck.png', description: 'Pan, mantequilla, mermelada y café o té.', allergens: ['gluten', 'lactose'] },
        { id: 61, name: 'Großes Frühstück', category: 'Combos Desayuno', price: 9.90, image: 'images/grosses_fruhstuck.png', description: 'Pan, mantequilla, mermelada, queso, embutido, huevo cocido y bebida caliente.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 62, name: 'Vegetarisches Frühstück', category: 'Combos Desayuno', price: 9.90, image: 'images/vegetarisches_fruhstuck.png', description: '🌱 Pan, mantequilla, mermelada, queso, huevo cocido y bebida caliente.', allergens: ['gluten', 'lactose', 'eggs'] },

        // Extras
        { id: 63, name: 'Brötchen', category: 'Extras', price: 1.00, image: 'images/brotchen.png', description: 'Panecillo recién horneado.', allergens: ['gluten'] },
        { id: 64, name: 'Croissant Extra', category: 'Extras', price: 1.50, image: 'images/croissant.png', description: 'Croissant de mantequilla.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 65, name: 'Mantequilla Extra', category: 'Extras', price: 0.50, image: 'images/butter.png', description: 'Porción de mantequilla.', allergens: ['lactose'] },
        { id: 66, name: 'Mermelada Extra', category: 'Extras', price: 0.50, image: 'images/marmelade.png', description: 'Porción de mermelada de fresa.', allergens: [] },
        { id: 67, name: 'Nutella Extra', category: 'Extras', price: 0.50, image: 'images/nutella.png', description: 'Porción de crema de avellanas.', allergens: ['lactose', 'nuts'] },
        { id: 68, name: 'Queso Extra', category: 'Extras', price: 1.50, image: 'images/kase.png', description: 'Loncha de queso Edam o similar.', allergens: ['lactose'] },
        { id: 69, name: 'Embutido Extra', category: 'Extras', price: 1.50, image: 'images/wurst.png', description: 'Loncha de jamón cocido o salami.', allergens: [] },
        { id: 70, name: 'Huevo Cocido', category: 'Extras', price: 1.00, image: 'images/ei_gekocht.png', description: 'Huevo duro.', allergens: ['eggs'] },

        // Süßes Frühstück (Desayuno dulce)
        { id: 71, name: 'Croissant con Mermelada o Nutella', category: 'Desayuno Dulce', price: 2.50, image: 'images/croissant_marmelade_nutella.png', description: 'Acompañado de tu elección.', allergens: ['gluten', 'lactose', 'eggs', 'nuts'] },
        { id: 72, name: 'Muffin (Süß)', category: 'Desayuno Dulce', price: 2.00, image: 'images/muffin.png', description: 'Muffin con pepitas de chocolate.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 73, name: 'Donut (Süß)', category: 'Desayuno Dulce', price: 2.00, image: 'images/donut.png', description: 'Clásico donut glaseado.', allergens: ['gluten', 'lactose', 'eggs'] },
        
        // Frühstückspezialitäten (Especialidades de desayuno)
        { id: 74, name: 'Rührei mit Brot', category: 'Especialidades Desayuno', price: 4.90, image: 'images/ruhrei_mit_brot.png', description: '🥚 Huevos revueltos cremosos con pan tostado.', allergens: ['gluten', 'lactose', 'eggs'] },
        { id: 75, name: 'Spiegelei mit Brot', category: 'Especialidades Desayuno', price: 4.90, image: 'images/spiegelei_mit_brot.png', description: '🥚 Huevos fritos con pan tostado.', allergens: ['gluten', 'eggs'] },
        { id: 76, name: 'Omelett mit Gemüse', category: 'Especialidades Desayuno', price: 5.90, image: 'images/omelett_mit_gemuse.png', description: '🥚 Omelette con pimientos, champiñones y cebolla.', allergens: ['eggs'] },

        // Kinderkarte (Menú infantil)
        { id: 77, name: 'Mini-Pizza', category: 'Menú Infantil', price: 6.90, image: 'images/mini_pizza.png', description: 'Pizza margarita de tamaño infantil.', allergens: ['gluten', 'lactose'] },
        { id: 78, name: 'Chicken Nuggets mit Pommes', category: 'Menú Infantil', price: 7.50, image: 'images/chicken_nuggets_pommes.png', description: 'Nuggets de pollo con patatas fritas.', allergens: ['gluten'] },
        { id: 79, name: 'Pasta mit Butter', category: 'Menú Infantil', price: 5.90, image: 'images/pasta_mit_butter.png', description: 'Pasta simple con mantequilla.', allergens: ['gluten', 'lactose'] },

        // Pasta
        { id: 80, name: 'Pasta Napoli', category: 'Pasta', price: 8.90, image: 'images/pasta_napoli.png', description: '🌱 Con salsa de tomate y albahaca.', allergens: ['gluten'] },
        { id: 81, name: 'Pasta Bolognese', category: 'Pasta', price: 9.90, image: 'images/pasta_bolognese.png', description: 'Con salsa de carne y tomate.', allergens: ['gluten'] },
        { id: 82, name: 'Pasta Pesto', category: 'Pasta', price: 9.90, image: 'images/pasta_pesto.png', description: '🥜 Con pesto de albahaca y piñones.', allergens: ['gluten', 'lactose', 'nuts'] }
    ];

    const allergenEmojis = {
        gluten: { emoji: '🍞', name: 'Gluten' },
        lactose: { emoji: '🥛', name: 'Lactosa' },
        nuts: { emoji: '🥜', name: 'Frutos Secos' },
        eggs: { emoji: '🥚', name: 'Huevo' }
    };

    const menuItemsContainer = document.getElementById('menu-items-container');
    const menuCategoriesContainer = document.getElementById('menu-categories');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const tableNumberInput = document.getElementById('table-number');
    const modalContainer = document.getElementById('modal-container');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const newOrderBtn = document.getElementById('new-order-btn');
    const qrCodeContainer = document.getElementById('qrcode');
    const ticketContentEl = document.getElementById('ticket-content');

    let cart = [];
    
    // Audio Context for sound effects
    let audioContext;
    const soundBuffers = {};

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            loadSound('add_item.mp3');
            loadSound('order_placed.mp3');
        }
    }

    async function loadSound(url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            soundBuffers[url] = audioBuffer;
        } catch (error) {
            console.error(`Error loading sound: ${url}`, error);
        }
    }

    function playSound(url) {
        if (audioContext && soundBuffers[url]) {
            const source = audioContext.createBufferSource();
            source.buffer = soundBuffers[url];
            source.connect(audioContext.destination);
            source.start(0);
        }
    }
    
    // Attach audio initialization to the first user interaction
    document.body.addEventListener('click', initAudio, { once: true });

    function renderMenu(filter = 'Todos') {
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

    function renderCategories() {
        const categories = ['Todos', ...new Set(menuData.map(item => item.category))];
        menuCategoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = category;
            if (category === 'Todos') {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                document.querySelector('.category-btn.active').classList.remove('active');
                btn.classList.add('active');
                renderMenu(category);
            });
            menuCategoriesContainer.appendChild(btn);
        });
    }

    function addToCart(itemId, quantity) {
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

    function updateQuantity(itemId, change) {
        const itemInCart = cart.find(item => item.id === itemId);
        if (itemInCart) {
            itemInCart.quantity += change;
            if (itemInCart.quantity <= 0) {
                cart = cart.filter(item => item.id !== itemId);
            }
        }
        renderCart();
    }

    function renderCart() {
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

  // ✅ Solo genera el QR si el carrito tiene contenido
  if (typeof generarQR === "function" && cart.length > 0) {
    generarQR();
  }
}



    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = `€${total.toFixed(2)}`;
        placeOrderBtn.disabled = cart.length === 0;
    }

    tableNumberInput.addEventListener('input', () => {
        tableNumberInput.classList.remove('invalid');
    });

    menuItemsContainer.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(target.dataset.id);
            const input = target.closest('.add-controls').querySelector('.quantity-input');
            const quantity = parseInt(input.value);
            addToCart(itemId, quantity);
            input.value = '1';
        }
        if (target.classList.contains('quantity-change-btn')) {
            const itemId = parseInt(target.dataset.id);
            const change = parseInt(target.dataset.change);
            const input = target.closest('.add-controls').querySelector('.quantity-input');
            let currentValue = parseInt(input.value);
            currentValue += change;
            if (currentValue < 1) {
                currentValue = 1;
            }
            input.value = currentValue;
        }
    });

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

    function generateWhatsAppMessage() {
        const tableNumber = tableNumberInput.value;
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        let message = `*¡Nuevo Pedido!* ℹ️🍽️\n`;
        message += `*MESA:* ${tableNumber}\n`;
        message += `------------------------------\n\n`;
        

        cart.forEach(item => {
            message += `*${item.quantity}x* ${item.name} - €${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `------------------------------\n`;
        message += `*TOTAL:* €${total.toFixed(2)}\n\n`;
        message += `_Pedido realizado a través del Menú Interactivo._`;
        
        return message;
    }

    function generateTicketText() {
        const now = new Date();
        const date = now.toLocaleDateString('es-ES');
        const time = now.toLocaleTimeString('es-ES');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        let ticket = `****** Pedido ******\n`;
        ticket += `Café Patagonia\n`;
        ticket += `Fecha: ${date} ${time}\n`;
        ticket += `------------------------------\n`;
        ticket += `Cant.  Producto          Total\n`;
        ticket += `------------------------------\n`;

        cart.forEach(item => {
            const name = item.name.padEnd(18, ' ').substring(0, 18);
            const quantity = String(item.quantity).padStart(2, ' ');
            const itemTotal = (item.price * item.quantity).toFixed(2).padStart(7, ' ');
            ticket += `${quantity}   ${name} ${itemTotal}\n`;
        });

        ticket += `------------------------------\n`;
        ticket += `TOTAL: ${('€'+total.toFixed(2)).padStart(23, ' ')}\n`;
        ticket += `\n¡Gracias por su visita!`;
        return ticket;
    }

    function sendOrderViaWhatsApp() {
        const tableNumber = tableNumberInput.value;
        if (!tableNumber || parseInt(tableNumber) <= 0) {
            alert('Por favor, introduce un número de mesa válido.');
            tableNumberInput.classList.add('invalid');
            tableNumberInput.focus();
            return;
        }

        // Generate message and ticket BEFORE clearing the cart
        const message = generateWhatsAppMessage();
        const ticketText = generateTicketText();

        const phoneNumber = '34684792506'; // Without '+' or spaces
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        playSound('happy-pop.mp3');
        window.open(whatsappUrl, '_blank');
        
        // Show confirmation modal with the order that was just sent
        showOrderModal(ticketText); 
        
        // Reset the main interface for the next order
        cart = [];
        tableNumberInput.value = '';
        tableNumberInput.classList.remove('invalid');
        renderCart();
    }

    function showOrderModal(ticketText) {
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

    function hideOrderModal() {
        modalContainer.classList.add('hidden');
    }
    
    function resetOrder() {
        hideOrderModal();
        // Cart is already cleared, this just ensures modal closes correctly
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

    // Initial Render
    renderCategories();
    renderMenu();
});