const token = 'TU_TOKEN_DE_BASEROW';

export async function guardarPedidoBorrador(pedidoId, fecha) {
  return fetch('https://api.baserow.io/api/database/rows/table/ID_TABLA_BORRADOR_CLIENTE/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ID: pedidoId, Fecha: fecha })
  });
}

export async function guardarDetalleProducto(pedidoId, producto, cantidad, nota) {
  return fetch('https://api.baserow.io/api/database/rows/table/ID_TABLA_DETALLE_BORRADOR/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'Pedido ID': pedidoId,
      Producto: producto,
      Cantidad: cantidad,
      Nota: nota
    })
  });
}

export async function guardarPedidoCamarero(pedidoId, fecha) {
  return fetch('https://api.baserow.io/api/database/rows/table/ID_TABLA_CAMARERO/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ID: pedidoId, Fecha: fecha })
  });
}
