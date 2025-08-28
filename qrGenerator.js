export function showOrderQRCode(container, orderId) {
    if (!orderId || !container) return;

    container.innerHTML = ''; // Limpiar cualquier QR anterior

    new EasyQRCode(container, {
        text: orderId,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ebf0c0ff",
        correctLevel: EasyQRCode.CorrectLevel.H,
        title: 'Pedido #' + orderId
    });
}
