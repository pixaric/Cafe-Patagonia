const pedidoId = `PED-${Date.now()}`;
const mesa = document.getElementById('table-number').value;
const fecha = new Date().toISOString();

// 1. Guardar en pedido_borrador_cliente
await fetch('https://api.baserow.io/api/database/rows/table/TU_TABLA_PEDIDO/', {
  method: 'POST',
  headers: {
    'Authorization': 'Token TU_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    campo_id: pedidoId,
    campo_mesa: mesa,
    campo_fecha: fecha
  })
});

// 2. Guardar productos en detalle_pedido
for (const item of cart) {
  await fetch('https://api.baserow.io/api/database/rows/table/TU_TABLA_DETALLE/', {
    method: 'POST',
    headers: {
      'Authorization': 'Token TU_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      campo_pedido_id: pedidoId,
      campo_producto: item.name,
      campo_cantidad: item.quantity,
      campo_nota: item.note || ''
    })
  });
}
