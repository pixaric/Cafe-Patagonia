import { cart } from './cart.js';

export  function generateWhatsAppMessage() {
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

export  function generateTicketText() {
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
