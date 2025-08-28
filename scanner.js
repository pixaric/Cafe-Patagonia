import { guardarPedidoCamarero } from './api.js';

document.getElementById('escanearBtn').addEventListener('click', () => {
  const html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    async (decodedText) => {
      html5QrCode.stop();
      const pedidoId = decodedText;

      const detalleRes = await fetch('https://api.baserow.io/api/database/rows/table/ID_TABLA_DETALLE_BORRADOR/?user_field_names=true', {
        headers: { Authorization: `Token TU_TOKEN_DE_BASEROW` }
      });
      const productos = (await detalleRes.json()).results.filter(p => p['Pedido ID'] === pedidoId);

      mostrarPedido(productos); // tu función para mostrar en pantalla

      document.getElementById('guardarBtn').onclick = async () => {
        await guardarPedidoCamarero(pedidoId, new Date().toISOString());
        alert('✅ Pedido guardado en la BD del camarero');
      };
    },
    (errorMessage) => {}
  );
});
