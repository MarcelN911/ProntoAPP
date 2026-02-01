function submitOrder() {
    if (basket.length === 0) {
        alert("🛒 Dein Warenkorb ist noch leer!\n\nLass uns etwas Köstliches zusammenstellen, bevor du bestellst! 😋");
        return;
    }

    const deliveryText = deliveryMode === "delivery" ? "🚗 Lieferung" : "📦 Abholung";
    const modal = document.getElementById("order-modal");
    document.getElementById("modal-delivery-mode").textContent = deliveryText;
    document.getElementById("modal-total-price").textContent = document.getElementById("total-price").textContent;
    modal.classList.remove("hidden");
    modal.removeAttribute("inert");
}

function closeOrderModal() {
    const modal = document.getElementById("order-modal");
    modal.classList.add("hidden");
    modal.setAttribute("inert", "");

    basket = [];
    renderBasket();
    renderBasketModal();
    updateBasketSummary();
}
