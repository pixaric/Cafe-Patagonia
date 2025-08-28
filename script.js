import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";

import { database, menuData, allergenEmojis } from './menu.js';
import { showOrderQRCode } from './qrGenerator.js';





document.addEventListener('DOMContentLoaded', () => {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDFdTREJvegUdsOUc7A0-NTOvKemQmTGyI",
      authDomain: "pedidosqr-34bea.firebaseapp.com",
      //databaseURL: "https://pedidosqr-34bea-default-rtdb.firebaseio.com", // ← este es el que falta
      projectId: "pedidosqr-34bea",
      storageBucket: "pedidosqr-34bea.firebasestorage.app",
      messagingSenderId: "743534119824",
      appId: "1:743534119824:web:17cf79d3b6952380084115"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

     

    const menuItemsContainer = document.getElementById('menu-items-container');
    const menuCategoriesContainer = document.getElementById('menu-categories');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const finalizeOrderBtn = document.getElementById('finalize-order-btn');
    const tableNumberInput = document.getElementById('table-number');
    const modalContainer = document.getElementById('modal-container');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const newOrderBtn = document.getElementById('new-order-btn');
    const qrCodeContainer = document.getElementById('qrcode');
    const ticketContentEl = document.getElementById('ticket-content');
    const orderQrCodeContainer = document.getElementById('order-qr-code');

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
        console.log('menuData:', menuData); //temporal

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

    //qr actualizable
function actualizarQR() {
  const qrCanvas = document.getElementById("order-qr-code");
  if (!qrCanvas || cart.length === 0) return;

  const ticketText = generateTicketText();

  new QRious({
    element: qrCanvas,
    value: ticketText,
    size: 250
  });
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
        actualizarQR();
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = `€${total.toFixed(2)}`;
        const orderReady = cart.length > 0;
        placeOrderBtn.disabled = !orderReady;
        finalizeOrderBtn.disabled = !orderReady;
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

        let message = `*¡Nuevo Pedido!* 🎉\n\n`;
        message += `*Mesa:* ${tableNumber}\n`;
        message += `------------------------------\n`;

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
        
        playSound('order_placed.mp3');
        window.open(whatsappUrl, '_blank');
        
        // Show confirmation modal with the order that was just sent
        showOrderModal(ticketText); 
        
        // Reset the main interface for the next order
        cart = [];
        tableNumberInput.value = '';
        tableNumberInput.classList.remove('invalid');
        orderQrCodeContainer.innerHTML = '';
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
        orderQrCodeContainer.innerHTML = ''; // Also clear the cart QR code
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
    
    finalizeOrderBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            finalizeOrder();
        }
    });
    
    async function finalizeOrder() {
        const tableNumber = tableNumberInput.value;
        if (!tableNumber || parseInt(tableNumber) <= 0) {
            alert('Por favor, introduce un número de mesa válido.');
            tableNumberInput.classList.add('invalid');
            tableNumberInput.focus();
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderData = {
            table: parseInt(tableNumber),
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            totalPrice: total,
            createdAt: new Date().toISOString(),
            status: 'pending' // e.g., pending, preparing, completed
        };

        try {
            // Create a new reference with a unique key
            const newOrderRef = push(ref(database, 'pedidos'));
            
            // Set the data at that reference
            await set(newOrderRef, orderData);
            
            

            // 👇 Aquí es donde debes insertar la llamada al QR
        const orderId = newOrderRef.key;
        showOrderQRCode(orderQrCodeContainer, orderId);

            
            // Generate and display QR code in the cart
            orderQrCodeContainer.innerHTML = '';
            new EasyQRCode(orderQrCodeContainer, {
                text: orderId,
                width: 120,
                height: 120,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: EasyQRCode.CorrectLevel.H,
                title: 'ID de Pedido'
            });

            playSound('order_placed.mp3');
            
            // Optionally, show a confirmation message before resetting
            alert(`Pedido ${orderId} realizado con éxito!`);

            // Reset UI for next order
            cart = [];
            tableNumberInput.value = '';
            tableNumberInput.classList.remove('invalid');
            renderCart();
            // The QR code remains until a new item is added or page is refreshed.
        
        } catch (error) {
            console.error("Error al enviar el pedido a la base de datos:", error);
            alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
        }
    }
    
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