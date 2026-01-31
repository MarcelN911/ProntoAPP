function submitOrder() {
    if (basket.length === 0) {
        alert("🛒 Dein Warenkorb ist noch leer!\n\nLass uns etwas Köstliches zusammenstellen, bevor du bestellst! 😋");
        return;
    }

    const deliveryText = deliveryMode === "delivery" ? "🚗 Lieferung" : "📦 Abholung";
    document.getElementById("modal-delivery-mode").textContent = deliveryText;
    document.getElementById("modal-total-price").textContent = document.getElementById("total-price").textContent;
    document.getElementById("order-modal").classList.remove("hidden");
}

function closeOrderModal() {
    document.getElementById("order-modal").classList.add("hidden");

    basket = [];
    renderBasket();
    renderBasketModal();
    updateBasketSummary();
}
